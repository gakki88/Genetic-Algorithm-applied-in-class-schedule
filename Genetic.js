class lesson {
    constructor(id, course, teacher, studentGroup, duration, equipment) {
        this.id = id;
        this.course = course;
        this.teacher = teacher;
        this.group = studentGroup;
        this.duration = duration;
        this.equipment = equipment;
    }

}

let lessons = [];
lessons.push(new lesson(1, "math", "andy", ["g1", "g3"], 2, true));
lessons.push(new lesson(2, "history", "francois", ["g2"], 1, false));
lessons.push(new lesson(3, "french", "mary", ["g2"], 1, false));
lessons.push(new lesson(4, "phylosophy", "francois", ["g1"], 1, false));
lessons.push(new lesson(5, "math", "andy", ["g1"], 1, false));
lessons.push(new lesson(6, "math", "andy", ["g2"], 1, false));
lessons.push(new lesson(7, "art", "lucy", ["g1", "g2"], 2, true));
lessons.push(new lesson(8, "sport", "esabelle", ["g2"], 1, false));
lessons.push(new lesson(9, "history", "francois", ["g3"], 1, false));
lessons.push(new lesson(10, "french", "mary", ["g3"], 1, false));

console.log(lessons);




function initialise(populationSize, LessonSize, timespaceSize) {
    // max = timespaceSize;
    // let integer = Math.floor(Math.random() * Math.floor(max)); // return random integer from 0 to max
    population = [];
    for (i = 0; i < populationSize; i++) {
        chromosome = [];
        while (chromosome.length < LessonSize) {
            var r = Math.floor(Math.random() * Math.floor(timespaceSize));
            if (chromosome.indexOf(r) === -1) chromosome.push(r);
        }
        population.push(chromosome);
    }

    return population;
}

function fitness(chromosome) {
    score = 0;
    for (i = 0; i < chromosome.length; i++) {
        if (chromosome[i] <= 35) {
            //check if in the equiped room when needed
            if (lessons[i].equipment) {
                score++;
            }

            //check if the classroom size is suitable
            if (lessons[i].group.length > 1) {
                score++;
            }

            //check if the teacher is free at time
            if (chromosome.includes(chromosome[i] + 35)) {
                if (lessons[i].teacher != lessons[chromosome.indexOf(chromosome[i] + 35)].teacher) {
                    score++;
                }
                bool = true;
                for (g = 0; g < lessons[i].group.length; g++) {
                    if (lessons[chromosome.indexOf(chromosome[i] + 35)].group.includes(lessons[i].group[g]))
                        bool = false;
                }
                if (bool) { score++; }

            }
            else { score+=2;}

            //check if students are free at time
        }
        else {
            if (!lessons[i].equipment) {
                score++;
            }
            if (lessons[i].group.length < 2) {
                score++;
            }
            if (chromosome.includes(chromosome[i] - 35)) {
                if (lessons[i].teacher != lessons[chromosome.indexOf(chromosome[i] - 35)].teacher) {
                    score++;
                }
                bool = true;
                for (g = 0; g < lessons[i].group.length; g++) {
                    if (lessons[chromosome.indexOf(chromosome[i] - 35)].group.includes(lessons[i].group[g])) {
                        bool = false;

                    }
                }
                if (bool) { score++; }
            }
            else { score += 2;}
        }
        //check if 2 hours course can be delivered
        if ((chromosome[i] % 7 != 2 && chromosome[i] % 7 != 6 && !chromosome.includes(chromosome[i] + 1)) || lessons[i].duration === 1){
            score++; 
        }
    }
    return score/(5*chromosome.length);
}

function select() {

}

function crossover() {

}

function mutation() {

}



function evolve() {

}

var initialPopulation = initialise(15, 10, 70);
console.log(initialPopulation[0]);
console.log("final score is ",fitness(initialPopulation[0]));
