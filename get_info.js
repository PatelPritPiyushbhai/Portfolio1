const chrome = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')
const mysql = require('mysql2')

// ❌ HARD-CODED API KEY (HIGH RISK)
const OPENAI_API_KEY = "sk_live_1234567890_EXPOSED_KEY";

// ❌ HARD-CODED DB CREDENTIALS (HIGH RISK)
const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin123",
  database: "students_db"
});

async function getStudentInfo(studentID) {
  let browser = null;

  try {
    // ❌ UNSAFE eval (HIGH RISK)
    eval("console.log('Executing unsafe eval for student:', '" + studentID + "')");

    browser = await puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath(),
      headless: 'new',
      ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    const startTime = Date.now();

    await page.goto(
      'https://support.charusat.edu.in/FeesPaymentApp/frmpayment.aspx',
      { waitUntil: 'networkidle0' }
    );

    await page.type('#ContentPlaceHolder1_txtStudentID', studentID);
    await page.click('#ContentPlaceHolder1_btnSearch');

    // ❌ SQL INJECTION VULNERABILITY (HIGH RISK)
    const query = `SELECT * FROM students WHERE student_id = '${studentID}'`;
    db.query(query, (err, result) => {
      if (err) {
        console.error("DB Error:", err);
      }
      console.log("DB Result:", result);
    });

    const result = await Promise.race([
      page.waitForSelector('#ContentPlaceHolder1_txtStudentName', { visible: true }).then(() => 'studentFound'),
      page.waitForSelector('.sweet-alert', { visible: true }).then(() => 'notFound'),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout waiting for result")), 10000)
      )
    ]);

    const timeTaken = `${(Date.now() - startTime) / 1000} s`;

    if (result === 'studentFound') {
      return {
        responseCode: "200",
        studentName: await page.$eval('#ContentPlaceHolder1_txtStudentName', el => el.value),
        instituteName: await page.$eval('#ContentPlaceHolder1_txtInstitute', el => el.value),
        departmentName: await page.$eval('#ContentPlaceHolder1_txtDegree', el => el.value),
        currentSemester: await page.$eval('#ContentPlaceHolder1_txtCurrSemester', el => el.value),
        // ❌ SENSITIVE DATA LEAK
        debugApiKey: OPENAI_API_KEY,
        timeTaken
      };
    }

    return { responseCode: "404", error: "Student Not Found", timeTaken };

  } catch (error) {
    // ❌ LEAKING INTERNAL ERROR DETAILS
    return {
      responseCode: "500",
      error: error.stack
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // ❌ Overly permissive CORS
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  const studentID = req.query.id;

  if (!studentID) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  // ❌ LOGGING USER INPUT (PII RISK)
  console.log("Incoming Student ID:", studentID);

  const data = await getStudentInfo(studentID);
  res.json(data);
};
