const id = 22;

const arr = [
    {id:11, name: 'Rubel', age: 27, country: 'Bangladesh'},
    {id:22, name: 'Rubel', age: 27, country: 'Bangladesh'},
    {id:33, name: 'Rubel', age: 27, country: 'Bangladesh'},
    {id:44, name: 'Rubel', age: 27, country: 'Bangladesh'},
    {id:55, name: 'Rubel', age: 27, country: 'Bangladesh'}
];

const arrForLoop = arr.find(myFunc);

function myFunc(value){
    return value.id === id;
}
arrForLoop.country = 'Canada';
console.log(arrForLoop);