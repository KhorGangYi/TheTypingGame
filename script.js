// DOM Elements
const TIMER = document.getElementById("timer");
const SCORE = document.getElementById("score");
const START = document.getElementById("start");
const WORDS = document.getElementById("words");
const TYPED_WORDS = document.getElementById("typed");
const NOTTYPED_WORDS = document.getElementById("notTyped");

// Word Bank
const WORD_BANK = [
    'REMAIN', 'WORKER', 'CREATE', 'STITCH', 'MOVING', 'RETAIN', 'MOSQUE','ENDURE', 'TISSUE', 'TONGUE', 'ANNUAL', 'RELIEF', 'SUBWAY', 'FINGER', 'FRIEND', 
    'COMMON', 'CIRCLE', 'MOTHER', 'EFFLUX', 'SUNTAN', 'HAMMER', 'SMOOTH', 'CHOOSE', 'DILUTE', 'RANDOM', 'INSERT', 'ABSENT', 'ATTACK', 'THEORY', 'SUPPLY', 
    'COURSE', 'BUFFET', 'SURVEY', 'MEMORY', 'THROAT', 'LEADER', 'GUTTER', 'LINGER', 'SYSTEM', 'FROZEN', 'FLAWED', 'NUANCE', 'JACKET', 'BORDER', 'ACTIVE', 
    'PEANUT', 'MAKEUP', 'RETURN', 'PORTER', 'DEBATE', 'KILLER', 'COLONY', 'FILTER', 'STRONG', 'RESORT', 'AFFORD', 'EMPIRE', 'EMBARK', 'THRONE', 'MUSEUM', 
    'SCHEME', 'MARINE', 'DESIGN', 'SUMMER', 'SNATCH', 'SPIRIT', 'VOLUME', 'SHIVER', 'AGENDA', 'UNREST', 'CHEQUE', 'BRONZE', 'ETHNIC', 'HEAVEN', 'IMMUNE', 
    'PATROL', 'CARBON', 'ROCKET', 'REVOKE', 'STROKE', 'SILVER', 'PRISON', 'SECOND', 'CHEESE', 'TEMPLE', 'BARREL', 'CLIQUE', 'BANISH', 'ASYLUM', 'CREDIT', 
    'STUDIO', 'EXPECT', 'CORPSE', 'RELATE', 'EXPAND', 'THREAT', 'OCCUPY', 'TABLET', 'THREAD', 'EARWAX', 'PROPER', 'ACQUIT', 'RHYTHM', 'CANCER', 'SEASON', 
    'CHARGE', 'SINGER', 'FACTOR', 'OFFSET', 'MUTTER', 'WINTER', 'BEHEAD', 'VELVET', 'AVENUE', 'BLONDE', 'EXOTIC', 'VALLEY', 'ASPECT', 'MATRIX', 'CHORUS', 
    'ROTTEN', 'SUNDAY', 'BUNDLE', 'SUBURB', 'PASTEL', 'BETRAY', 'NORMAL', 'FIGURE', 'PARADE', 'CARROT', 'PUBLIC', 'EUROPE', 'BISHOP', 'CELLAR', 'GARAGE', 
    'EXTEND', 'PALACE', 'BANNER', 'WEAPON', 'DEPART', 'AFFECT', 'HAPPEN', 'DELETE', 'FREEZE', 'MANAGE', 'INDOOR', 'STICKY', 'THRUST', 'KETTLE', 'BALLOT', 
    'CORNER', 'CHURCH', 'DEGREE', 'OBJECT', 'FOREST', 'DIVIDE', 'TICKET', 'CRISIS', 'HORROR', 'SAFARI', 'PACKET', 'CENTER', 'REFORM', 'INSIDE', 'ADMIRE', 
    'INSTAL', 'REJECT', 'EMBRYO', 'SECURE', 'LESSON', 'FOSSIL', 'REWARD', 'DEPUTY', 'SUMMIT'
];

// Constants
const DEFAULT_TIMER = 20;
const MUSIC = new Audio("music.mp3");
const CORRECT_SFX = new Audio("correct.mp3");

// Audio Settings
MUSIC.volume = 0.02;
CORRECT_SFX.playbackRate = 1.5;

// Declarations
let countDownInterval;

// Resets
reset();

// FUNCTION: Reset
function reset(){
    TIMER.innerHTML = DEFAULT_TIMER;
    SCORE.innerHTML = 0;
    START.disabled = false;
    TYPED_WORDS.textContent = "";
    NOTTYPED_WORDS.textContent = "Click the Start Button";
    MUSIC.pause();
    MUSIC.currentTime = 0;
}

// FUNCTION: Timer
function countDown(){
    // Count Down
    TIMER.innerHTML -= 1;

    // Check if Finished
    if(TIMER.innerHTML == 0)
    {
        alert("Game Over! Your score is " + SCORE.innerHTML);
        clearInterval(countDownInterval);
        reset();
    }
}

// FUNCTION: Start
function startGame(){
    // Reset
    reset();
    
    // Start Countdown
    countDownInterval = setInterval(countDown, 1000);

    // Disable Button
    START.disabled = true;
    START.blur();

    // Start Music
    MUSIC.play();

    // Randomise Word
    randomiseWord();
}

// FUNCTION: Randomise Word
function randomiseWord(){
    TYPED_WORDS.textContent = "";
    NOTTYPED_WORDS.textContent = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

// FUNCTION: Check Typed Key
function checkTyped(evt){
    // Get Current Required Character
    const curChar = NOTTYPED_WORDS.textContent.charAt(0)

    // Check if typed correct
    if(evt.key.toUpperCase() == curChar)
    {
        TYPED_WORDS.textContent += curChar;
        NOTTYPED_WORDS.textContent = NOTTYPED_WORDS.textContent.slice(1);
    }

    // Check if typed finished
    if(NOTTYPED_WORDS.textContent.length == 0)
    {
        finishWord();
        CORRECT_SFX.pause();
        CORRECT_SFX.currentTime = 0;
        CORRECT_SFX.play();
    }    
}

// FUNCTION: Finish a Word
function finishWord(){
    // Randomise new word
    randomiseWord();

    // Add Score
    SCORE.innerHTML = parseInt(SCORE.innerHTML) + 1;
}

// EVENT HANDLER: Start
START.addEventListener('click', startGame);

// EVENT HANDLER: Check Type
document.addEventListener('keydown', function(evt){
    checkTyped(evt);
});