


const treeple = {};

treeple.adults = [

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
        moisture: ["dry", "wet"],
        shade: ["partial_shade"],
        soil: ["clay", "sand"],
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

treeple.start_to_planting = function() {
    $('.start_game').on('click', function (event) {
        event.preventDefault();
        $('header').fadeOut("slow");
        $('.sprite').fadeIn();
        $('.soil_form').fadeIn();
        treeple.start_timer("plant_prompt");
        $('.normal_seed_float').removeClass('hidden');
    });
};

treeple.planting_to_water = function() {
    $('.soil_form').on('submit', function (event) {
        event.preventDefault();
        clearInterval(treeple.interval)
        // To get the addTally function to run for each seperate group of questions (which are connected by radio buttons with the same 'name', pass the addTally function a parameter that matches the question group similarity (in this case, 'soil'. Otherwise, when the user answers for the next group of questions, the code will detect the radio button that the user clicked before it (it is still in the html, just hidden), and duplicate that answer in the tally.)
        treeple.add_to_tally('soil');
        $('.soil_form').fadeOut("slow");
        $('.moisture_form').fadeIn();
        treeple.start_timer("water_prompt");
    });
};

treeple.water_to_sun = function() {
    $('.moisture_form').on('submit', function (event) {
        event.preventDefault();
        clearInterval(treeple.interval)
        treeple.add_to_tally('moisture');
        $('.moisture_form').fadeOut("slow");
        $('.shade_form').fadeIn();
        treeple.start_timer("shade_prompt");
    });
};

treeple.sun_to_space = function() {
    $('.shade_form').on('submit', function (event) {
        event.preventDefault();
        clearInterval(treeple.interval)
        treeple.add_to_tally('shade');
        $('.shade_form').fadeOut("slow");
        $('.size_form').fadeIn();
        treeple.start_timer("size_prompt");
    });
};

treeple.space_to_get_largest_tally = function() {
    $('.size_form').on('submit', function (event) {
        event.preventDefault();
        clearInterval(treeple.interval);
        $('.size_form').fadeOut("slow");
        treeple.get_largest_tally('tally');
        $('.sprite').toggleClass("hidden")
    });
};

treeple.start_timer = function(hurry_promt_class) {
    let set_timer = 25;
    // Makes code inside the setInterval function run on the specified interval. Ex: every second, set_timer = set_timer - 1.
    treeple.interval = setInterval(function () {
        $(".main").toggleClass("hidden");

        if (set_timer === 25) {
            $(".happy_seed").toggleClass("hidden")
            $(".main").toggleClass("hidden_important")
            // Make it display a div at 20seconds. Use setTimeout to make the div dissapear on a 3 sec delay
            setTimeout(function () {
                $(".happy_seed").addClass("hidden");
                $(".main").removeClass("hidden_important")
                // denotes miliseconds
            }, 2000);
        };

        if (set_timer === 15) {
            $(`.hurry.${hurry_promt_class}`).fadeIn();
            $(".hurry_seed").toggleClass("hidden")
            $(".main").addClass("hidden_important")
            setTimeout(function () {
                $(`.hurry.${hurry_promt_class}`).fadeOut();
                $(".hurry_seed").toggleClass("hidden");
                $(".main").toggleClass("hidden_important")
            }, 3000);
        };
        if (set_timer === 0) {
            $("input").attr("disabled", true);
            $(".dead_seed").toggleClass("hidden")
            $(".main").toggleClass("hidden_important")
        }
        if (set_timer === -3) {
            location.reload();
        }
        set_timer = set_timer - 1;
    }, 1000);
};


// 'question_group_input_name' is a place holder. We do not want to be too specific (for example, naming it 'soil'), because we want this function to work for all the different question groups.
treeple.add_to_tally = function(question_group_input_name) {
    //  Use template literals below because to add the addTally parameter to the answer string and have it reference the input name specific to the current round of questions
    const answer = $(`input[name=${question_group_input_name}]:checked`).val();
    // With the loop below, the browser is told to start with i = 0. If i is less than the length of the array (which is 5), execute the related code, and add 1 to i. When i = the length of the array, stop.
    for (let i = 0; i < treeple.adults.length; i++) {
        // Where the wanted object lives = current index in array [i]
        const current_tree = treeple.adults[i];
        // In order to access an object property that matches a variable, use square bracket notation, not dot notation.
        const current_tree_question_group = current_tree[question_group_input_name];
        // If current_tree_question_group contains (so is greater than -1) the user's choice (answer),
        if (current_tree_question_group.indexOf(answer) > -1) {
            current_tree.tally = current_tree.tally + 1;
        }
    };
};


// CAN I SEPARATE THE FUNCTION WITHIN THIS FUNCTION BELOW???
treeple.get_largest_tally = function() {
    // Grab the first highest tally, and make the treeple.adults array return the object with that tally
    const first_max_tally = _.max(treeple.adults, tree => tree.tally);
    // Get the value of the tally in that object.
    const winning_tally_number = first_max_tally.tally
    // Grab all the treeple.adults with that tally, and get rid of all others.
    const winners = treeple.adults.filter(tree => tree.tally === winning_tally_number);

    // ---------------------------------------------
    // OTHER OPTION FOR ABOVE FUNCTION (That I thought didn't work, but actually does, so imma leave it here because it uses underscore.js):

    // const group_by_tally =  _.groupBy(treeple.adults, 'tally');
    // console.log('GROUP BY TALLY', group_by_tally);
    // Above grouped 'treeple adults by tally', but in an object. Get an array of the items.
    // Make an empty array.
    // const tally_array = [];
    //Make a for in loop that will go through grouped object and push each item onto the empty array above
    // for (var item in group_by_tally) {
    //     array = [item, group_by_tally[item]];
    //     tally_array.push(array)
    // }
    //     const winners = _.max(tally_array,(group) => Number(group[0]) );
    //     const winning_trees = winners[1];
    // -----------------------------------------------

    // Generate a random number between 0 and the length of the array
    // Useing that number grab the object out of the array
    const index = Math.floor(Math.random() * winners.length);
    let random_winner = winners[index];

    // Use object to link to ID of result image
    // Use '===' and not '=' to check if equal to. Using '=' will assign an attribute instead of check for one.
    display_winner = function() {
        $('.main').toggleClass('hidden');
        $('.wrapper_sprite').toggleClass('hidden')
        if (random_winner.name === 'black_walnut') {
            $('.black_walnut').fadeIn();
        } else if (random_winner.name === 'black_spruce') {
            $('.black_spruce').fadeIn();
        } else if (random_winner.name === 'jack_pine') {
            $('.jack_pine').fadeIn();
        } else if (random_winner.name === 'eastern_white_cedar') {
            $('.eastern_white_cedar').fadeIn();
        } else if (random_winner.name === 'american_beech') {
            $('.american_beech').fadeIn();
        }
    };
    display_winner();
};

treeple.new_game = function(){
    $('.end_game').on('click', function (e) {
        location.reload();
    });
    $('.wrapper_results').toggleClass(hidden);
};

treeple.init = function() {
    treeple.start_to_planting();
    treeple.planting_to_water();
    treeple.water_to_sun();
    treeple.sun_to_space();
    treeple.space_to_get_largest_tally();
    treeple.new_game();
};

$(function () {
    treeple.init();
});


// Stretch Goals: 
// Add more questions, aka: "A deer came by! help!"
// Update the look of the tree after every choice (maybe after certain number of answers or time), and not just at the end.
// Browser cache to keep your pet, make timer longer. Make it live as a new tab page.
// Have bars that go down for water and sun, and go up when given. These buttons an option all the time, after planting etc.
// make each treeple a different colour on start.
// change the required specification on the radio buttons so that the alert can be styled.

