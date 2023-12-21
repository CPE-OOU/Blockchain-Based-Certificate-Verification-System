// const fs = require("fs");
// const path = require("path");
// const xlsx = require("xlsx");

// const register = () => {
//   try {
//     const workbook = xlsx.readFile("Cybersecurity.xlsx");
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     const selectedColumns = jsonData
//       .map((row) => {
//         if (row[0] && row[1]) {
//           // Extract the surname from the name and remove spaces
//           const surname = row[1].toLowerCase().replace(/\s/g, "");
//           // Generate the email from the matric number
//           const email = `${row[0]
//             .toLowerCase()
//             .replace(/\//g, "")}@oouagoiwoye.edu.ng`;
//           return {
//             matricNo: row[0],
//             name: `${row[3]} ${row[2]} ${row[1]}`,
//             email: email,
//             password: surname,
//             role: "student",
//             identityNo: row[0],
//           };
//         }
//       })
//       .filter(Boolean);

//     // Write the selectedColumns array to a JSON file
//     fs.writeFileSync(
//       path.join(__dirname, "users.json"),
//       JSON.stringify(selectedColumns, null, 2)
//     );
//     console.log("JSON file created successfully.");
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//   }
// };

// register();
