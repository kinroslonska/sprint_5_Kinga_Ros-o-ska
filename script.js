const people = [
  { firstName: false, lastName: 2 },
  { firstName: "Roman", lastName: "Kowalski" },
  { firstName: "Halina", lastName: "Malina" },
  { firstName: "B", lastName: "22" },
  { firstName: "Jan", lastName: "Nowak" },
  { firstName: "Kamil", lastName: null }
];

function generatePseudonyms(people) {
  return people.map(person => {
    const { firstName, lastName } = person;

    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      firstName.trim().length < 3 ||
      lastName.trim().length < 3
    ) {
      return person;
    }

    const reversedFirst = firstName.trim().slice(-3).split('').reverse().join('');
    const reversedLast = lastName.trim().slice(0, 3).split('').reverse().join('');
    const pseudonym = (reversedFirst + reversedLast)
      .toLowerCase()
      .replace(/^./, c => c.toUpperCase());

    return { ...person, pseudonym };
  });
}

const result = generatePseudonyms(people);
console.log(result);
