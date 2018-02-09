


const treeple = {};

treeple.adults = [
// Could I make this a for in loop and use objects instead of this array???
    {   
        name: "black_walnut",
        size: ["large"],
        moisture: ["wet"],
        shade: ["full_sun"],
        soil: ["loam"],
        intolerant: ["shade"],
        tally: 0
    },

    {   
        name: "black_spruce",
        size: ["medium", "large"],
        moisture: ["dry", "moist", "wet"],
        shade: ["partial_shade"],
        soil: ["clay", "loam", "sand"],
        intolerant: [""],
        tally: 0
    },

    {   
        name: "jack_pine",
        size: ["medium"],
        moisture: ["dry"],
        shade: ["full_sun"],
        soil: ["sand"],
        intolerant: ["shade"],
        tally: 0
    },

    {
        name: "eastern_white_cedar",
        size: ["small"],
        moisture: ["wet"],
        shade: ["partial_shade"],
        soil: ["clay"],
        intolerant: [""],
        tally: 0
    },

    {
        name: "american_beech",
        size: ["medium"],
        moisture: ["wet"],
        shade: ["shadow"],
        soil: ["loam"],
        intolerant: [""],
        tally: 0
    },

    // sugar_maple: {

    // }

    // pin_cherry: {

    // }

    // birch: {

    // }

];




$(function () {

    $('.start_game').on('click', function (event) {
        event.preventDefault();
        $('header').fadeOut();
        $('.sprite').fadeIn();
        $('.soil_form').fadeIn();
    });

    $('.soil_form').on('submit', function (event) {
        event.preventDefault();
        // To get the addTally function to run for each seperate group of questions (which are connected by radio buttons with the same 'name', pass the addTally function a parameter that matches the question group similarity (in this case, 'soil'. Otherwise, when the user answers for the next group of questions, the code will detect the radio button that the user clicked before it (it is still in the html, just hidden), and duplicate that answer in the tally.)
        addTally('soil');
        $('.soil_form').fadeOut();
        $('.moisture_form').fadeIn();
        // reset timer
    });

    $('.moisture_form').on('submit', function (event) {
        event.preventDefault();
        addTally('moisture');
        $('.moisture_form').fadeOut();
        $('.shade_form').fadeIn();
        // reset timer

    });

    $('.shade_form').on('submit', function (event) {
        event.preventDefault();
        addTally('shade');
        $('.shade_form').fadeOut();
        $('.size_form').fadeIn();
        // reset timer
    });

    $('.size_form').on('submit', function (event) {
        event.preventDefault();
        addTally('size');
        $('.size_form').fadeOut();
        $('.result').fadeIn();
        organizeTally('tally');
        // end timer


    });

    // 'question_group_input_name' is a place holder. We do not want to be too specific (for example, naming it 'soil'), because we want this function to work for all the different question groups.
    function addTally(question_group_input_name) {
        //  Use template literals below because to add the addTally parameter to the answer string and have it reference the input name specific to the current round of questions
        const answer = $(`input[name=${question_group_input_name}]:checked`).val();
        // With the loop below, the browser is told to start with i = 0. If i is less than the length of the array (which is 5), execute the related code, and add 1 to i. When i = the length of the array, stop.
        for (let i = 0; i < treeple.adults.length; i = i + 1) {
            // Where the wanted object lives = current index in array [i]
            const current_tree = treeple.adults[i];
            // In order to access an object property that matches a variable, use square bracket notation, not dot notation.
            const current_tree_question_group = current_tree[question_group_input_name];
            // If current_tree_question_group contains (so is greater than -1) the user's choice (answer),
            if (current_tree_question_group.indexOf(answer) > -1) {
                current_tree.tally = current_tree.tally + 1;
                console.log(treeple.adults)
            }
        };
    };

    function organizeTally(final_tallies) {
        //using groupBy
        //get something that looks like this
        // {
        //     4: ['birch', 'oak'],
        //     1: ['maple']
        // }
       const grouped =  _.groupBy(treeple.adults, 'tally');
        console.log(grouped);
    };

    // continuously toggle 2 images
    // if timer = 10, display "${Plant me}!")
    // if timer = 5, display "Hurry! ${Plant me}!" message
    // If timer = 0, hide toggled images, display dead image

});


// check if next fieldset is last fieldset, if it is the last fieldset, figure out how to get the one with the highest tally. If two options, Math.random

// chanage avatar to array item that is linked to highest tally

// add timer to each question that has pop up text and then death at set times.
// animate sprite by flipping from one image to another, consistent one image to another (walking) and then  image of happy when fed or dead when not fed in time.


// Extra: 
// Thirsty meter 
// Add more questions, aka: "A deer came by! help!"
// Update the look of the tree after every choice (maybe after certain number of answers or time), and not just at the end
// Browser cache to keep your pet, make timer longer
// Have bars that go down for water and sun, and go up when given. These buttons an option all the time, after planting etc.

