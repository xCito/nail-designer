
// Shape 
// Color
// Design

const DESIGN_COMPLEXITY_SCORES = {
  Simple: 10,
  Complex: 20,
  Expertise: 30,
}

const FINGER = {
  thumb: 0,
  index: 1,
  middle: 2,
  ring: 3,
  pinky: 4
};

const DESIGN_SCORE = {
  French: 3,
  Marble: 3,
  Gradient: 2,
  GlitterTopper: 1, 
  Dots: 1,
  Jelly: 2,
  Sticker: 2,
  Gem: 1,
  GemCluster: 2,
  Charm: 2,
  Sugaring: 3,
  Foil: 2,
  Chrome: 2,
  Magnetic: 1,
  StripingTape: 2,

  // Icons & Simple effects 
  // (ghost, bat, cresent, 4 point star, stitches, bow, 
  // heart, beach water, dotflowers, clouds, mickey head, 
  // web, christmas lights blobbicure)
  HandDrawnLevel_1: 2, 

  // Intricate 
  // (French, goop, frame, beach ball, tree, coffee cup,
  //  lavalamp, chrome design, glowinthedark, animal print)
  HandDrawnLevel_2: 3, 

  // Realism 
  // (characters, stylistic letters, words)
  HandDrawnLevel_3: 4, 
};

const leftHand = [0, 0, 0, 0, 0];
const rightHand = [0, 0, 0, 0, 0];


let totalScore = 0;
let numColors = 0;


// LEFT DESIGN SCORE -> design * colors used
leftHand[FINGER.thumb]    = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
leftHand[FINGER.index]    = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
leftHand[FINGER.middle]   = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
leftHand[FINGER.ring]     = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
leftHand[FINGER.pinky]    = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
// RIGHT DESIGN Sticker
rightHand[FINGER.thumb]   = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
rightHand[FINGER.index]   = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
rightHand[FINGER.middle]  = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
rightHand[FINGER.ring]    = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots
rightHand[FINGER.pinky]   = DESIGN_SCORE.Sticker + DESIGN_SCORE.Dots

// COLORS USED:
numColors = 1;

totalScore = leftHand.reduce((total, finger) => finger + total, 0)
      + rightHand.reduce((total, finger) => finger + total, 0);

      
if (numColors >= 4) {
  totalScore += 5;
} else if (numColors >= 2) {
  totalScore += 3;
} else {
  totalScore += 0;
}


if (totalScore >= DESIGN_COMPLEXITY_SCORES.Expertise) {
  console.log('This is an expertise design');
} else if (totalScore >= DESIGN_COMPLEXITY_SCORES.Complex) {
  console.log('This is a complex design');
} else {
  console.log('This is a simple design');
}