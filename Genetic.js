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



function initialise(populationSize, LessonSize, timespaceSize) {
    population = [];
    for (let ips = 0; ips < populationSize; ips++) {
        chromosome = [];
        while (chromosome.length < LessonSize) {
            var r = Math.floor(Math.random() * Math.floor(timespaceSize));
            if (chromosome.indexOf(r) === -1) chromosome.push(r);
        }
        population.push(chromosome);
    }

    return population;
}

//fitness for one chromosome
function fitness(chromosome) {
    score = 0;
    for (let i = 0; i < chromosome.length; i++) {
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
            else { score += 2; }

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
            else { score += 2; }
        }
        //check if 2 hours course can be delivered
        if ((chromosome[i] % 7 != 2 && chromosome[i] % 7 != 6 && !chromosome.includes(chromosome[i] + 1)) || lessons[i].duration === 1) {
            score++;
        }
    }
    return score / (5 * chromosome.length);
}

function selectParents(population) {
    let sum = 0;
    population.forEach(e => { sum += e.fitness; });

    let p1 = Math.floor(Math.random() * Math.floor(sum));
    let i = 0;
    while (p1 < sum) {
        p1 += population[i].fitness;
        i++;
    }
    i--;
    let p2 = Math.floor(Math.random() * Math.floor(sum));
    let j = 0;
    while (p2 < sum) {
        p2 += population[j].fitness;
        j++;
    }
    j--;
    return { mother: population[i], father: population[j] };
}

// One point crossover
//l is length of chromosome,number of genes
//n is number of timespace slot
function crossover(chromosome1, chromosome2, l, n) {
    p = Math.floor(Math.random() * Math.floor(l-1));
    child1 = chromosome1.slice(0,p+1) + "," + chromosome2.slice(p+1, l);
    child2 = chromosome2.slice(0,p+1) + "," + chromosome1.slice(p+1, l);
    child1 = child1.split(",").map(x => +x);
    child2 = child2.split(",").map(x => +x);
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    duplicates1 = findDuplicates(child1);
    while (duplicates1.length > 0) {
        g = Math.floor(Math.random() * Math.floor(n));
        child1[child1.indexOf(duplicates1[0])] = g;
        duplicates1 = findDuplicates(child1);
    }
    duplicates2 = findDuplicates(child2);
    while (duplicates2.length > 0) {
        g = Math.floor(Math.random() * Math.floor(n));
        child2[child2.indexOf(duplicates2[0])] = g;
        duplicates2 = findDuplicates(child2);
    }
    return { child1: child1, child2: child2 };
}

//swap mutation of two random genes
function mutation(chromosome, l) {
    p1 = Math.floor(Math.random() * Math.floor(l));
    p2 = Math.floor(Math.random() * Math.floor(l));
    [chromosome[p1], chromosome[p2]] = [chromosome[p2], chromosome[p1]];
    //return chromosome;
}


//l = chromosome length
//n = timespace slot number
//s = population size
function evolve(population, l, n, s, pc, pm) {
    population.sort(function (a, b) {
        return b.fitness - a.fitness;
    });
    parents = selectParents(population);
    if (Math.random() <= pc) {
        children = crossover(parents.mother.chromosome, parents.father.chromosome, l, n);
    }
    else {
        children = {
            child1: parents.mother.chromosome,
            child2: parents.father.chromosome
        }
    }
    if(Math.random() <= pm){
        mutation(children.child1, l);
    }
    if(Math.random() <= pm){
        mutation(children.child2, l);
    }
    population[s-1] = {chromosome:children.child1, fitness: fitness(children.child1)};
    population[s-2] = {chromosome:children.child2, fitness: fitness(children.child2)};
}

l = 10; n = 70; s = 15;
var initialPopulation = initialise(15, 10, 70);  //l = 10, n = 70
population = [];
initialPopulation.forEach(element => {
    population.push({ chromosome: element, fitness: fitness(element) });
});
evolve(population, l, n, s, 0.8, 0.2 );
for(generation = 0; generation < 200; generation++){
    if(population[0].fitness<1)
        evolve(population, l, n, s, 0.8, 0.2 );
    else break;
}
console.log("generation: ",generation, "best fitness: " ,population[0].fitness);

console.log(population);


