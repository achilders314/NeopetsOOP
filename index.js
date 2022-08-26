function Pet(species) {
    this.health = 100;
    this.happiness = 50;
    this.hunger = 0;
    this.isHappy = true;
    this.isHealthy = true;
    this.isHungry = false;
    this.numHeals = 3;
    this.numFood = 10;
    this.species;
}

// function HealthBar(fill, startHealth, color) {
//     this.fill = fill;
//     this.maxHealth = 100;
//     this.health = startHealth;
//     this.color = color;

//     show(context){
//         context.strokeStyle = "#333";
//         context.lineWidth = 5;
//         context.fillStyle = this.color;
//         context.fillRect(this.x, this.y, this.w, this.h);
//         context.strokeRect(this.x, this.y, this.maxWidth);
//     }
// }


$(document).ready(function() {
    function updateStats(){
        if(newPet.hunger<40 && newPet.happiness>50 && newPet.health > 30){
            $("div#petPic").html(`<img src="/images/${newPet.species}/${newPet.species}_happy.png">`);
            $("#petMessage").text(`I am happy! Yay!`)
        }
        if(newPet.health<30) {
            $("div#petPic").html(`<img src="/images/${newPet.species}/${newPet.species}_sick.png">`);
            $("#petMessage").text(`I am feeling sick, please heal me soon!`)
        }
        else if(newPet.happiness<=50){
            $("div#petPic").html(`<img src="/images/${newPet.species}/${newPet.species}_sad.png">`);
            $("#petMessage").text(`I am unhappy, please play with me!`)
        }
        else if(newPet.hunger>40){
            $("div#petPic").html(`<img src="/images/${newPet.species}/${newPet.species}_sad.png">`);
            $("#petMessage").text(`I am hungry, please feed me!`)
        }
        if(newPet.numHeals == 0 || newPet.numFood == 0){
            $("div#petPic").html(`<img src="/images/gameover.jpg">`);
            $("#petMessage").text(`You are out of supplies. Game over`)
        }
        if(newPet.health == 0 || newPet.hunger == 100){
            $("div#petPic").html(`<img src="/images/gameover.jpg">`);
            $("#petMessage").text(`You neglected your pet. Game over`);
            $('button#feedPet').on("click", function(){});
            $('button#healPet').on("click", function(){});
            $('button#playPet').on("click", function(){});
        }

        $("span.health").text(newPet.health);
        $("span.happiness").text(newPet.happiness);
        $("span.hunger").text(newPet.hunger);
        $("span.heals").text(newPet.numHeals);
        $("span.food").text(newPet.numFood);

    }

    var newPet = new Pet();
    // var healthBar = new HealthBar(100, 100, 'green');
    // var happinessBar = new HealthBar(100, 50, 'green');
    // var hungerBar = new HealthBar(100, 0, 'green');

    $('#select').on("click", function selectSpecies(){
        newPet = new Pet();
        var species = $('#species :selected').text();
        newPet.species = species;
        $(".species").text(species);
        $("div#petPic").html(`<img src="/images/${species}/${species}_happy.png">`);
        $("#petMessage").text(`I am unhappy, please play with me!`)
        $("span.health").text(newPet.health);
        $("span.happiness").text(newPet.happiness);
        $("span.hunger").text(newPet.hunger);
        $("span.heals").text(newPet.numHeals);
        $("span.food").text(newPet.numFood)
        setInterval(function(){
            updateStats();
            if(newPet.numHeals == 0 || newPet.numFood == 0 || newPet.health == 0 || newPet.hunger == 100 || newPet.happiness == 0){
                return;
            }
            newPet.happiness--;
        }, 1000)    
        setInterval(function(){
            updateStats();
            if(newPet.numHeals == 0 || newPet.numFood == 0 || newPet.health == 0 || newPet.hunger == 100 || newPet.happiness == 0){
                return;
            }
            if(newPet.numHeals == 0 || newPet.numFood == 0 || newPet.health == 0 || newPet.hunger == 100 || newPet.happiness == 0){
                return;
            }
            newPet.hunger++;
        }, 2000)
    });


    $('button#feedPet').on("click", function(){
        if(newPet.health<100){newPet.health += 5}
        if(newPet.hunger>0){
            if(newPet.hunger<20){newPet.hunger = 0}
            else{newPet.hunger -= 20}
        }
        if(newPet.happiness<100){newPet.happiness += 2}
        if(newPet.numFood != 0){newPet.numFood--};
        updateStats();

    });
    $('button#healPet').on("click", function(){
        if(newPet.health<100){newPet.health = 100}
        if(newPet.happiness>=15){newPet.happiness -= 15}
        if(newPet.numHeals != 0){newPet.numHeals -= 1};
        updateStats();

    });
    $('button#playPet').on("click", function(){
        if(newPet.health>=15){newPet.health -= 15} else if(newPet.health<15){newPet.health = 0}
        if(newPet.hunger<100){newPet.hunger += 12}
        if(newPet.happiness <= 80){newPet.happiness += 20}
        else{newPet.happiness = 100}
        updateStats();

    });
    if(newPet.health == 0 || newPet.hunger == 100){
        return;
    }


})