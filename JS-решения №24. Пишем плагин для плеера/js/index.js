const video = new GraphPlayer('#my-video', {
  initialVolume: 0.2,
  modClass: "asdasdasd",
  isPaused: (video) => {
    console.log(video);
  }
});
