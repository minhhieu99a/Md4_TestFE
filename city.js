function ShowAllCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city",
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {
                content += `<tr><td>${data[i].id}</td>
                        <td>${data[i].name}</td>` +
                    `<td>${data[i].area}</td>` +
                    `<td>${data[i].gdp}</td>` +
                    ` <td>${data[i].population}</td>` +
                    `<td>${data[i].country.name}</td>` +
                    `<td><button onclick="deleteCity(${data[i].id})" data-bs-toggle="modal" >Delete</button><td/>
                 <td><button type="button" onclick="showEditForm(${data[i].id})" data-bs-toggle="modal" data-bs-target="#myModal">Update</button></td>` +
                    `</tr>`
            }
            $("#showList").html(content)
        }
    })
}
function showFormCreat() {
    let content = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="CreatNewCity()">Creat</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>`;
    $("#action").html(content)
}
function CreatNewCity() {
    let name = $(`#name1`).val();
    let area = $(`#area1`).val();
    let gdp = $(`#gdp1`).val();
    let population = $(`#population1`).val();
    let country = $(`#country1`).val();
    let city = {
        name: name,
        area: area,
        gdp: gdp,
        population: population,
        country: {
            id: parseInt(country)
        }
    }
    $.ajax({
        headers: {
            'Accepted': 'application/json',
            'Content-Type': 'application/json',
        },
        type:"POST",
        data: JSON.stringify(city),
        url:"http://localhost:8080/city",
        success:function () {
            ShowAllCity()
        }
    })
    event.preventDefault();
}
function deleteCity(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/city/${id}`,
        success: function () {
            ShowAllCity();
        }
    })
    event.preventDefault();
}

function allCountry() {
    $.ajax({
        // headers: {
        //     'Accept': 'application/json',
        //
        type: "GET",
        url: "http://localhost:8080/city/country",
        success: function (country) {
            let content = '';
            for (let i = 0; i < country.length; i++) {
                content += `<option value="${country[i].id}">${country[i].name}</option>`
            }
            $("#country1").html(content);
        },
    })
}

function showEditForm(id) {
    let content = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="updateCity(${id})">Update</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>`
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city/${id}`,
        success: function (city) {
            $(`#name1`).val(city.name),
                $(`#area1`).val(city.area),
                $(`#gdp1`).val(city.gdp),
                $(`#population1`).val(city.population),
                $(`#country1`).val(city.country.name)
            $("#action").html(content)
        }
    })
}

function updateCity(id) {
    let name = $(`#name1`).val();
    let area = $(`#area1`).val();
    let gdp = $(`#gdp1`).val();
    let population = $(`#population1`).val();
    let country = $(`#country1`).val();
    let city = {
        name: name,
        area: area,
        gdp: gdp,
        population: population,
        country: {
            id: parseInt(country)
        }
    }
    $.ajax({
        headers: {
            'Accepted': 'application/json',
            'Content-Type': 'application/json',
        },
        type:"PUT",
        data : JSON.stringify(city),
        url:`http://localhost:8080/city/${id}`,
        success:function () {
            ShowAllCity()
        }
    })
}

allCountry();

ShowAllCity();