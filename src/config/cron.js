import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
    https
        .get(process.env.API_URL, (res) => {
            if (res.statusCode === 200) console.log("GET request sent successfully");
            else console.log("GET required failed", res.statusCode);
        })
        .on("error", (e) => console.error("Error while sending request", e));
});


export default job;


// CRON JOB EXPLANATION:
// Cron job are scheduled tasks that run periodically at fixed intervals
// we want to send 1 Get request for every 14 minutes so that our api never gets inactive on Render.com

// How to defined a "Schedule"?
// You defin a schedule using a cron expression, which consists of 5 fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES & EXPLANATION:
// * 14 * * * * - Every 14 minutes
// * 0 0 * * 0 - At midnight of every sunday
// * 30 3 15 * * - At 3:15 AM, on te 5th of every month
// * 0 0 1 1 * - At midnight, on junuary 1st
// * 0 * * * * - Every hour