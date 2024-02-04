function load_specialité() {
  var select_spe = document.getElementById('specialité-select');
  var len = select_spe.length
  for (var i = 1; i < len; i++) {
    select_spe.remove(1);

  }

  var select = document.getElementById('faculté-select');
  var faculté = select.options[select.selectedIndex].value;
  if (faculté == '5') {
    var select_spe = document.getElementById('specialité-select');
    //spe 1
    select_spe.options[select_spe.options.length] = new Option('ACAD', 'ACAD');
    //spe 2
    select_spe.options[select_spe.options.length] = new Option('ISIL', 'ISIL');
    //spe 3
    select_spe.options[select_spe.options.length] = new Option('GTR', 'GTR');
    //spe 4
    select_spe.options[select_spe.options.length] = new Option('IV', 'IV');

    //spe 5
    select_spe.options[select_spe.options.length] = new Option('SII', 'SII');
    //spe 6
    select_spe.options[select_spe.options.length] = new Option('IL', 'IL');
    //spe 7
    select_spe.options[select_spe.options.length] = new Option('BIO-INFO', 'BIO-INFO');
    //spe 8
    select_spe.options[select_spe.options.length] = new Option('RSD', 'RSD');
    //spe 9
    select_spe.options[select_spe.options.length] = new Option('BIG-DATA', 'BIG-DATA');
    select_spe.options[select_spe.options.length] = new Option('HPC', 'HPC');
    select_spe.options[select_spe.options.length] = new Option('SSI', 'SSI');


  }
}

function load_emp() {

  var select = document.getElementById('faculté-select');
  var faculté = select.options[select.selectedIndex].value;

  var select = document.getElementById('specialité-select');
  var specialité = select.options[select.selectedIndex].value;

  var select_pdf = document.getElementById('pdf-reader');
  if (faculté == '5') {
    select_pdf.setAttribute('src', "Emplois_pdf/" + specialité + ".pdf");
  }

}

function search() {
  document.getElementById("pdf-ctr").className = "pdf-container anim-inv";

  setTimeout(function () {
    document.getElementById("pdf-ctr").style.visibility = "hidden";
  }, 300);


    setTimeout(function () {
      load_emp();
      document.getElementById("pdf-ctr").style.visibility = "visible";
      document.getElementById("pdf-ctr").className = "pdf-container anim";
    }, 800);
  
}