const catsData = [];
  
  // Function to sanitize and escape a string for SQL
  function escapeString(str) {
    return str.replace(/'/g, "''");
  }
  
  // Iterate through the JSON data and generate SQL INSERT statements
  const insertStatements = catsData.map((cat) => {
    const name = escapeString(cat.name);
    const description = escapeString(cat.description);
    const image = escapeString(cat.image);
    const gender = escapeString(cat.gender);
    const cage = parseInt(cat.cage.split('/')[0]); // Extract and convert cage value
    const adoptable = cat.adoptable === 'Yes' ? true : false;
  
    return `
      INSERT INTO cats (name, description, image, gender, cage, adoptable)
      VALUES (
        '${name}',
        '${description}',
        '${image}',
        '${gender}',
        ${cage},
        ${adoptable}
      );
    `;
  });
  
  // Join the SQL statements into a single string
  const sqlStatements = insertStatements.join('\n');
  
  console.log(sqlStatements);

//   save text file
const fs = require('fs');
fs.writeFile('insertcats.sql', sqlStatements, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File has been created');
    });
  