const course = {
  title: String,
};

// course   click --->  course structure

const courseDetails = {
  week1: {},
  week2: {},
  week3: {},
  brochures: {},

  // let's liveclass and recordings seprates
  liveClass: [
    {
      recordings: {},
    },
    {},
  ],
};

// CRON jobs for deleting the past live class links, keep other informations (per week)

// live class links are coming from admin sites

// admin can update live class links and recording links
const adminuser = {};
