module.exports = function certificateTemplate(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(to right, #a6ffcb, #12d8fa, #1fa2ff);
  }
  .certificate {
      width: 80%;
      margin: 50px auto;
      padding: 30px;
      background: #fff;
      text-align: center;
      border-radius: 20px;
      border: 10px double #ddd;
      box-shadow: 0px 0px 30px rgba(0,0,0,0.15);
  }
  .university {
      color: #3c3c3c;
      font-size: 40px;
  }
  .degree {
      color: #696969;
      font-size: 35px;
  }
  .name {
      color: #ff6347;
      font-size: 45px;
      margin-top: 40px;
  }
  .course {
      color: #696969;
      font-size: 35px;
  }
  .date {
      color: #696969;
      font-size: 25px;
      margin-top: 40px;
  }
  .signature {
      color: #696969;
      font-size: 25px;
      margin-top: 60px;
  }
  .seal {
      /* position:absolute;  */
      /* bottom:20px;  */
      /* right:20px;  */
      width:120px; 
      height:auto
  }
</style>
    </head>
    <body style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: linear-gradient(to right, #a6ffcb, #12d8fa, #1fa2ff);">
        <div class="certificate">
            <h1 class="university">Olabisi Onabanjo University</h1>
            <h2 class="degree">${data.degreeType} Certificate</h2>
            <img src="../seal1.png" alt="Seal" class="seal">
            <h2 class="subtitle">This is to certify that</h2>
            <h2 class="name">${data.firstname} ${data.lastname} ${data.middlename}</h2>
            <h2 class="subtitle">has successfully completed the Bachelor's degree in</h2>
            <h2 class="course">${data.courseName}</h2>
            <p class="date">Year of Completion : ${data.yearOfCompletion}</p>
            <p class="signature">Signature : [Signature]</p>
        </div>
    </body>
    </html>
  `;
};