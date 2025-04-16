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

function generateAgeData(peopleWithPseudonyms) {
  return peopleWithPseudonyms
    .filter(person => person.pseudonym)
    .map((person, index) => {
      const { firstName, lastName, pseudonym } = person;

      const nameLength = firstName.length + lastName.length;

      let age;

      if (nameLength % 2 === 0) {
        age = nameLength;
      } else {
        const totalLength =
          ["firstName", "lastName", "pseudonym"]
            .reduce((sum, key) => sum + person[key].length, 0);
        const safeIndex = index === 0 ? 1 : index;
        age = Math.ceil(totalLength / safeIndex);
      }

      return { ...person, age };
    });
}

function addMostCommonLetter(data) {
  return data.map(person => {
    const { firstName, lastName, pseudonym } = person;

    const allLetters = (firstName + lastName + pseudonym).toLowerCase();

    const frequency = {};
    for (const char of allLetters) {
      if (char.match(/[a-z]/)) {
        frequency[char] = (frequency[char] || 0) + 1;
      }
    }

    let maxCount = 0;
    let mostCommon = '';
    for (const [letter, count] of Object.entries(frequency)) {
      if (count > maxCount || (count === maxCount && letter < mostCommon)) {
        maxCount = count;
        mostCommon = letter;
      }
    }

    return {
      ...person,
      mostCommonLetter: {
        letter: mostCommon,
        count: maxCount
      }
    };
  });
}

const withPseudonyms = generatePseudonyms(people);
const withAge = generateAgeData(withPseudonyms);
const finalResult = addMostCommonLetter(withAge);

console.log(finalResult);


