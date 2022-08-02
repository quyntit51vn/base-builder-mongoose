import axios from "axios";
import cron from "node-cron";
import Topic from "../constants";

const pushNotifyRocket = async () => {
  try {
    const requestURL =
      "https://chat.stdiohue.com/hooks/SLbBbrJeyaz5Z3tCN/RFea7CCsyPWMP8odsJrett2oTEYkgbMpsgbzxrhkSQCdkCo3";
    const options = {
      headers: { "content-type": "application/json" },
    };

    const data = {
      alias: "Nam Huỳnh",
      text: "Tháng mới rồi, nộp tiền quỹ nào mọi người ơiiiiiii :yeye::yeye::yeye:",
      attachments: [
        {
          image_url:
            "https://www.nicepng.com/png/full/107-1079237_shut-up-and-take-my-money-shut-up.png",
        },
      ],
    };
    await axios.post(requestURL, data, options);
  } catch (error) {
    console.log(error);
  }
};

const runPushNotifyRocket = cron.schedule(
  Topic.everyMonthTeamFundRecharge,
  pushNotifyRocket
);

export default runPushNotifyRocket;
