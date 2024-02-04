

//Width and height
var w = 700;
var h = 700;



var zoom = d3.zoom()
    .scaleExtent([1, 20])
    .translateExtent([[0, 0], [w, h]])
    .on("zoom", zoomed);


function reload() {
    remove_svg();
    place_SVG();
    d3.select('svg')
        .transition()
        .call(zoom.scaleTo, 0);
};


function place_SVG() {
    //Define map projection
    var proj = d3.geoMercator()
        .translate([0, 0])
        .scale([1]);

    //Define path generator
    var path = d3.geoPath()
        .projection(proj);

    window.svg = d3.select("#the_svg")
    window.g = svg.append("g");

    svg.call(zoom);

    d3.json("../scripts/map END.geojson", function (json) {

        d3.csv("../scripts/Dataset-Visualisation-Donnée-IVSII ISIL.csv", function (data_csv) {
            var select = document.getElementById('faculté-select');
            var fac = select.options[select.selectedIndex].value;


            var prof = document.getElementById('prof-select').value;


            var select = document.getElementById('day-select');
            var day = select.options[select.selectedIndex].value;

            var select = document.getElementById('Créneaux-select');
            var Créneau = select.options[select.selectedIndex].value;

            var select = document.getElementById('specialité-select');
            var spe = select.options[select.selectedIndex].value;

            var select = document.getElementById('palier-select');
            var pal = select.options[select.selectedIndex].value;

            var select = document.getElementById('section-select');
            var sec = select.options[select.selectedIndex].value;

            var select = document.getElementById('groupe-select');
            var groupe = select.options[select.selectedIndex].value;


            if (fac != "") {
                if (prof == "") {
                    if (spe == "") {
                        if (pal == "") {
                            if (groupe == "") {
                                var liste = test(data_csv, day, Créneau);
                            }
                            else {
                                var liste = test_1(data_csv, day, Créneau, groupe);
                            }
                        }
                        else {
                            if (groupe == "") {
                                var liste = test_2(data_csv, day, Créneau, pal);
                            }
                            else {
                                var liste = test_3(data_csv, day, Créneau, groupe, pal);
                            }
                        }
                    }
                    else {
                        if (pal == "") {
                            if (groupe == "") {
                                if (sec == "") {
                                    var liste = test_4(data_csv, day, Créneau, spe);
                                }
                                else{
                                    var liste = test_4_sec(data_csv, day, Créneau, spe,sec);
                                }
                            }
                            else {
                                if (sec == "") {
                                    var liste = test_5(data_csv, day, Créneau, groupe, spe);                            
                                }
                                else{
                                    var liste = test_5_sec(data_csv, day, Créneau, groupe, spe,sec);  
                                }

                            }
                        }
                        else {
                            if (groupe == "") { 
                                if (sec == "") {
                                    var liste = test_6(data_csv, day, Créneau, pal, spe);
                                }
                                else{
                                    var liste = test_6_sec(data_csv, day, Créneau, pal, spe,sec);
                                }
                            }
                            else {
                                if (sec == "") {
                                    var liste = test_all(data_csv, day, Créneau, groupe, pal, spe);
                                }
                                else{
                                    var liste = test_all_sec(data_csv, day, Créneau, groupe, pal, spe,sec);
                                }
                                
                            }
                        }
                    }

                }
                else {
                    var liste = test_final(data_csv, day, Créneau, groupe, pal, spe,prof,sec);
                }
            }
            else {
                var liste = test(data_csv, "", "");
            }


            var b = path.bounds(json);

            s = 0.8 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h);
            t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

            proj.translate(t).scale(s);


            // create a tooltip
            var Tooltip = d3.select("#descreption");

            var mouseover = function (d) {
                Tooltip
                    .style("opacity", 1)
                d3.select(this)
                    .style("stroke", "green")
                    .style("opacity", 0.8)
                    .style("cursor", "pointer")
                    .style("transition", "stroke 0.6s")
            };

            var mousemove = function (d) {
                var returned_element = occupied_room_info(d, liste);
                if (typeof returned_element.Niveau == "undefined") {
                    Tooltip.html(d.properties.name)
                        .style("left", (d3.mouse(this)[0] + 300) + "px")
                        .style("top", (d3.mouse(this)[1] + 50) + "px")

                } else {
                    Tooltip.html("Nom de la Salle:" + d.properties.name + "		Niveau:" + returned_element.Niveau + "		Spécialité:" + returned_element.Spécialité + " 		Groupe:"
                        + returned_element.Groupe + " 	Module:" + returned_element.Module + " 	Prof:" + returned_element.Prof)
                        .style("left", (d3.mouse(this)[0] + 400) + "px")
                        .style("top", (d3.mouse(this)[1] + 100) + "px")
                }

            };

            var mouseleave = function (d) {
                Tooltip
                    .style("opacity", 0)
                d3.select(this)
                    .style("stroke", 1)
                    .style("stroke", "black")
                    .style("opacity", 1)
            };

            var map = g.selectAll("path")
                .data(json.features);
            map.enter()
                .append("path")
                .attr("d", path)
                .attr("class", "cl1")
                .style("fill", function (d) {
                    var ret = occupied_room(d, liste);
                    if (ret == true) {
                        return randomColor();
                    }

                    return d.properties.fill;
                })
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);
        });

    });

};



function zoomed() {
    var transform = d3.event.transform;

    g.style("stroke-width", 1.5 / transform.k + "px");
    g.attr("transform", transform);
}

function zoom_in() {
    zoom.scaleBy(svg.transition().duration(750), 1.8);
}

function move_left() {
    d3.select('svg')
        .transition()
        .call(zoom.translateBy, 50, 0);
}

function move_right() {
    d3.select('svg')
        .transition()
        .call(zoom.translateBy, -50, 0);
}

function move_up() {
    d3.select('svg')
        .transition()
        .call(zoom.translateBy, 0, 50);
}

function move_down() {
    d3.select('svg')
        .transition()
        .call(zoom.translateBy, 0, -50);
}

function zoom_out() {
    zoom.scaleBy(svg.transition().duration(750), 1 / 1.8);
}

function reset() {
    d3.select('svg')
        .transition()
        .call(zoom.scaleTo, 0);
}


function remove_svg() {
    g.remove();
};


function test(data_csv, jour, Créneau) {

    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau) {
            liste.push(element);
        }
    });

    return liste;
};

function test_1(data_csv, jour, Créneau, groupe) {

    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Groupe == groupe) {
            liste.push(element);
        }
    });

    return liste;
};


function test_2(data_csv, jour, Créneau, pal) {

    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Niveau == pal) {
            liste.push(element);
        }
    });

    return liste;
};


function test_3(data_csv, jour, Créneau, groupe, pal) {

    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Niveau == pal && element.Groupe == groupe) {
            liste.push(element);
        }
    });

    return liste;
};

function test_4(data_csv, jour, Créneau, spe) {
    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Spécialité == spe) {
            liste.push(element);
        }
    });

    return liste;
};

function test_4_sec(data_csv, jour, Créneau, spe,sec) {
    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Spécialité == spe && element.Section == sec) {
            liste.push(element);
        }
    });

    return liste;
};



function test_5(data_csv, jour, Créneau, groupe, spe) {

    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Spécialité == spe && element.Groupe == groupe) {
            liste.push(element);
        }
    });

    return liste;
};

function test_5_sec(data_csv, jour, Créneau, groupe, spe,sec) {

    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Spécialité == spe && element.Groupe == groupe && element.Section == sec) {
            liste.push(element);
        }
    });

    return liste;
};

function test_6(data_csv, jour, Créneau, pal, spe) {

    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Spécialité == spe && element.Niveau == pal) {
            liste.push(element);
        }
    });

    return liste;
};

function test_6_sec(data_csv, jour, Créneau, pal, spe,sec) {

    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Spécialité == spe && element.Niveau == pal && element.Section == sec ) {
            liste.push(element);
        }
    });

    return liste;
};

function test_all(data_csv, jour, Créneau, groupe, pal, spe) {
    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Spécialité == spe && element.Niveau == pal && element.Groupe == groupe) {
            liste.push(element);
        }
    });

    return liste;
};
function test_all_sec(data_csv, jour, Créneau, groupe, pal, spe,sec) {
    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Spécialité == spe && element.Niveau == pal && element.Groupe == groupe && element.Section == sec) {
            liste.push(element);
        }
    });

    return liste;
};



function test_final(data_csv, jour, Créneau, groupe, pal, spe,prof ,sec) {
    var liste = [];
    data_csv.forEach(element => {

        if (element.Jours == jour && element.Créneaux == Créneau && element.Prof.toLowerCase()  == prof.toLowerCase()  && (element.Spécialité == spe || spe == "") && (element.Niveau == pal || pal == "") && (element.Groupe == groupe || groupe== "") && (element.Section == sec || sec== "") ) {
            liste.push(element);
        }
    });

    return liste;
};



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
        //add id's and onclick attributes
        var select_spe = document.getElementById('specialité-select');
        var len = select_spe.length
        for (var i = 1; i < len; i++) {
            select_spe[i].setAttribute('onclick', "load_groupes();load_palier();load_section();");
        }

    }
}


function load_section(){
    var select_sec = document.getElementById('section-select');
    var len = select_sec.length
    for (var i = 1; i < len; i++) {
        select_sec.remove(1);
    }

    var select = document.getElementById('specialité-select');
    var specialité = select.options[select.selectedIndex].value;
    if (specialité == 'IV' || specialité == 'BIG-DATA' || specialité == 'SII' || specialité == 'BIO-INFO' || specialité == 'RSD' || specialité == 'IL' || specialité == 'HPC' || specialité == 'SSI'  ) {
        var select_sec = document.getElementById('section-select');
        select_sec.options[select_sec.options.length] = new Option('Section A', 'A');
    }
    if (specialité == 'GTR') {
        var select_pal = document.getElementById('palier-select');
            select_sec.options[select_sec.options.length] = new Option('Section A', 'A');
    }
    if (specialité == 'ISIL') {
        var select_pal = document.getElementById('palier-select');
            select_sec.options[select_sec.options.length] = new Option('Section A', 'A');
            select_sec.options[select_sec.options.length] = new Option('Section B', 'B');
    }
    if (specialité == 'ACAD') {
        var select_pal = document.getElementById('palier-select');
            select_sec.options[select_sec.options.length] = new Option('Section A', 'A');
            select_sec.options[select_sec.options.length] = new Option('Section B', 'B');
            select_sec.options[select_sec.options.length] = new Option('Section C', 'C');
    }
        
    
}

function load_groupes() {
    var select_gp = document.getElementById('groupe-select');
    var len = select_gp.length
    for (var i = 1; i < len; i++) {
        select_gp.remove(1);
    }

    var select = document.getElementById('specialité-select');
    var specialité = select.options[select.selectedIndex].value;
    if (specialité == 'SSI') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'HPC') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }

    if (specialité == 'IV') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'SII') {
        var select_gp = document.getElementById('groupe-select');

        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('Groupe 3', '3');
        select_gp.options[select_gp.options.length] = new Option('Groupe 4', '4');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'IL') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('Groupe 3', '3');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'BIO-INFO') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'RSD') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'GTR') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'BIG-DATA') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'ISIL') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('Groupe 3', '3');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
    if (specialité == 'ACAD') {
        var select_gp = document.getElementById('groupe-select');
        select_gp.options[select_gp.options.length] = new Option('Groupe 1', '1');
        select_gp.options[select_gp.options.length] = new Option('Groupe 2', '2');
        select_gp.options[select_gp.options.length] = new Option('Groupe 3', '3');
        select_gp.options[select_gp.options.length] = new Option('Groupe 4', '4');
        select_gp.options[select_gp.options.length] = new Option('toute la section (cours)', '0');
    }
}

function load_palier() {

    var select_pal = document.getElementById('palier-select');
    var len = select_pal.length
    for (var i = 1; i < len; i++) {
        select_pal.remove(1);
    }

    var select = document.getElementById('specialité-select');
    var specialité = select.options[select.selectedIndex].value;
    if (specialité == 'IV' || specialité == 'BIG-DATA' || specialité == 'SII' || specialité == 'BIO-INFO' || specialité == 'RSD' || specialité == 'IL'|| specialité == 'HPC' || specialité == 'SSI' ) {
        var select_pal = document.getElementById('palier-select');
        select_pal.options[select_pal.options.length] = new Option('Master 1', 'M1');
        select_pal.options[select_pal.options.length] = new Option('Master 2', 'M2');
    }
    else {
        var select_pal = document.getElementById('palier-select');
        select_pal.options[select_pal.options.length] = new Option('Licence 2', 'L2');
        select_pal.options[select_pal.options.length] = new Option('Licence 3', 'L3');
    }

}





function occupied_room(data_geo, liste) {
    var occupied = false;
    liste.forEach(element => {
        if (data_geo.properties.id == element.Salle) {

            occupied = true
        }
    });

    return occupied;
};


function occupied_room_info(data_geo, liste) {
    var ret_element = [];
    liste.forEach(element => {
        if (data_geo.properties.id == element.Salle) {

            ret_element = element
        }
    });
    return ret_element;
};


function randomColor() {
    var o = Math.round, r = Math.random, s = 240;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';

};