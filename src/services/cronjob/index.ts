import runPushNotifyRocket from "./jobs/rocket";

const mainJob = () => {
    runPushNotifyRocket.start();
}

export default mainJob;
