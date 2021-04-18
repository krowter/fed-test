const delay = (delay, message) =>
  new Promise((res) =>
    setTimeout(() => {
      console.log(message);
      res();
    }, delay)
  );

const asynchronous = Object.freeze({
  series: async () => {
    await delay(2000, "Executed after 2s");
    await delay(1000, "Executed after 1s");
    await delay(500, "Executed after 0.5s");
    await delay(100, "Executed after 0.1s");
  },
  parallel: () => {
    delay(2000, "Executed after 2s");
    delay(1000, "Executed after 1s");
    delay(500, "Executed after 0.5s");
    delay(100, "Executed after 0.1s");
  },
});

asynchronous.parallel();

asynchronous.series();
