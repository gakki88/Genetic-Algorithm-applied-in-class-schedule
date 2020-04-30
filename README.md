## Introduction

This application aimed to apply Genetic Algorithm into class scheduling problem. Given the following constraints:

* One schedule is considered as a chromosome
* A population is a set of chromosomes
* One class is a combination of the following parameters:
  * class ID
  * course name
  * teacher name
  * group number of students
  * class duration
  * require the equiped room or not

## Algorithm
The fitness function considers the following points:
1. In the right equiped room (with equipment if required or without if not required)
2. In the right sized room (2 groups or more in large room, 2 groups less in small room, if exact 2 groups it's right in either)
3. Teacher is free at the time
4. Students are free at the time
5. The course duration is satisfied

## Prerequisites / Stack used