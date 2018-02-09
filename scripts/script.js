


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

    $('form').on('submit', function (event) {
        event.preventDefault();
        // Creating a local variable that grabs the name of the radio input
        const question_group = $('input[type=radio]:checked').attr("name");
        // Adding a local variable that grabs the value
        const answer = $('input[type=radio]:checked').val();
        // Taking the first variable and adding that as a property to the global object. Then (after the '=' symbol), adding the value of the checked radio to that ptoperty of the global object 
        treeple.adults[question_group] = answer;
        // Starting with i = 0. If i is less than the length of the array (which is 5), execute the code, and add 1 to i. When i = the length of the array, stop.
        for (let i = 0; i < treeple.adults.length; i = i + 1) {
            // Where the wanted object lives = current index in array [i]
            const current_tree = treeple.adults[i];
            // In order to access an object property that matches a variable, use square bracket notation, not dot notation.
            const current_tree_question_group = current_tree[question_group];
            // If current_tree_question_group contains (so is greater than -1) the user's choice (answer),
            if (current_tree_question_group.indexOf(answer) > -1) {
                current_tree.tally = current_tree.tally + 1;
            }
        };
        // next, add active class to next fieldset, and remove active class from current fieldset
        // check if next fieldset is last fieldset, if it is the last fieldset, figure out how to get the one with the highest tally.
        // chanage avatar to array item that is linked to highest tally
        // add timer to each question that has pop up text and then death at set times.
        // animate sprite by flipping from one image to another, consistent one image to another (walking) and then  image of happy when fed or dead when not fed in time.

        // initiate game on submit, then hide the prompt


    });

    $('.start_game').on('click', function (event) {
        event.preventDefault();
        $('header').fadeOut();
        $('.sprite').fadeIn();
        $('.soil').fadeIn();
    });

    // create three remaining buttons
    // add events to all of them making sure they are _unique_ (see start game button for example)
    // that way you can control what happens when you click each button
    
});


// Extra: 
// Thirsty meter 
// Add more questions, aka: "A deer came by! help!"
// Update the look of the tree after every choice, and not just at the end
