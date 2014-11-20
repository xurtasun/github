var API_BASE_URL = "https://api.github.com";
var USERNAME = "xurtasun";
var PASSWORD = "ocata1996";
var page = 1;

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

/*
Details about repository of GitHub API 
https://developer.github.com/v3/repos/
*/

$("#button_get_gists").click(function(e) {
	e.preventDefault();
	getGists();
});

$("#next").click(function(e) {
	e.preventDefault();
	getGistNext();
});


$("#last").click(function(e) {
	e.preventDefault();
	getGistBefore();
});


$("#button_get_gist").click(function(e) {
	e.preventDefault();
	var gistid = ($("#gist_id").val());
	getGist(gistid);
});

$("#button_gist_to_find").click(function(e) {
	e.preventDefault();
	getGistToEdit($("#gist_id_to_update").val());
});


$("#button_update_gist").click(function(e) {
	e.preventDefault();
	var idGist = $("#gist_id_to_update").val();
   	var newGist = new Object();
	newGist.content = $("#file_content_to_update").val()
	newGist.description = $("#gist_description_to_update").val()
	
	updateGist(newGist,idGist);
});

$("#button_to_create").click(function(e) {
	e.preventDefault();

    	var newGist;

		newGist ={
			"description" : $('#description_to_create').val(),
			"public" : true,
			"files":{
				"archivo2": {
					"content" : $('#file_content_to_create').val()
				}
			}
		}


	createGist(newGist);
});

$("#button_to_delete").click(function(e) {
	e.preventDefault();
	deleteRepo($("#gist_id_to_delete").val());
});




function getGists() {
	var url = API_BASE_URL + '/users/' + USERNAME + '/gists?page=1&per_page=3';
	$("#gists_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var gists = data;
				
				$.each(gists, function(i, v) {
					var gist = v;

					$('<h4> OWNER: ' + gist.owner.login + '</h4>').appendTo($('#gists_result'));
					$('<p>').appendTo($('#gists_result'));	
					$('<strong> ID: </strong> ' + gist.id + '<br>').appendTo($('#gists_result'));
					$('<strong> URL: </strong> ' + gist.html_url + '<br>').appendTo($('#gists_result'));
					$('<strong> Description: </strong> ' + gist.description + '<br>').appendTo($('#gists_result'));
					$('<strong> Date Creation: </strong> ' + gist.created_at + '<br>').appendTo($('#gists_result'));
					$('</p>').appendTo($('#gists_result'));
				});
				

	}).fail(function() {
		$("#gists_result").text("No gists.");
	});

}

function getGistLast() {
	page = page - 1;
	var url = API_BASE_URL + '/users/' + USERNAME + '/gists?page='+page+'&per_page=3';
	$("#gists_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var gists = data;
				
				$.each(gists, function(i, v) {
					var gist = v;

					$('<h4> OWNER: ' + gist.owner.login + '</h4>').appendTo($('#gists_result'));
					$('<p>').appendTo($('#gists_result'));	
					$('<strong> ID: </strong> ' + gist.id + '<br>').appendTo($('#gists_result'));
					$('<strong> URL: </strong> ' + gist.html_url + '<br>').appendTo($('#gists_result'));
					$('<strong> Description: </strong> ' + gist.description + '<br>').appendTo($('#gists_result'));
					$('<strong> Date Creation: </strong> ' + gist.created_at + '<br>').appendTo($('#gists_result'));
					$('</p>').appendTo($('#gists_result'));
				});
				

	}).fail(function() {
		$("#repos_result").text("No gists.");
	});

}

function getGistNext() {
	page = page + 1;
	var url = API_BASE_URL + '/users/' + USERNAME + '/gists?page='+page+'&per_page=3';
	$("#gists_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var gists = data;
				
				$.each(gists, function(i, v) {
					var gist = v;

					$('<h4> OWNER: ' + gist.owner.login + '</h4>').appendTo($('#gists_result'));
					$('<p>').appendTo($('#gists_result'));	
					$('<strong> ID: </strong> ' + gist.id + '<br>').appendTo($('#gists_result'));
					$('<strong> URL: </strong> ' + gist.html_url + '<br>').appendTo($('#gists_result'));
					$('<strong> Description: </strong> ' + gist.description + '<br>').appendTo($('#gists_result'));
					$('<strong> Date Creation: </strong> ' + gist.created_at + '<br>').appendTo($('#gists_result'));
					$('</p>').appendTo($('#gists_result'));
				

	}).fail(function() {
		$("#repos_result").text("No gists.");
	});

});
}

function getGist(gist_id) {
	var url = API_BASE_URL + '/gists/'+ gist_id;
	$("#get_gist_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var gist = data;

				$('<strong><h4> Owner</strong>: ' + gist.owner.login + '</h4>').appendTo($('#get_gist_result'));
				$('<p>').appendTo($('#get_gist_result'));	
				$('<strong> ID: </strong> ' + gist.id + '<br>').appendTo($('#get_gist_result'));
				$('<strong> URL: </strong> ' + gist.html_url + '<br>').appendTo($('#get_gist_result'));
				$('<strong> Description: </strong> ' + gist.description + '<br>').appendTo($('#get_gist_result'));
				$('</p>').appendTo($('#get_gist_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Gist not found </div>').appendTo($("#get_gist_result"));
	});

}

function getGistToEdit(gist_id_to_update) {
	var url = API_BASE_URL + '/gists/'+ gist_id_to_update;
	$("#get_gist_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var gist = data;

				$('<strong><h4> Owner</strong>: ' + gist.owner.login + '</h4>').appendTo($('#update_result'));
				$('<p>').appendTo($('#update_result'));	
				$('<strong> ID: </strong> ' + gist.id + '<br>').appendTo($('#update_result'));
				$('<strong> URL: </strong> ' + gist.html_url + '<br>').appendTo($('#update_result'));
				$('<strong> Description: </strong> ' + gist.description + '<br>').appendTo($('#update_result'));
				$('</p>').appendTo($('#update_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Gist not found </div>').appendTo($("#update_result"));
	});
}

function updateGist(gist,idGist) {
	var url = API_BASE_URL + '/gists/' + idGist;
	var data = JSON.stringify(gist);

	$("#update_result").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#update_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Updated</div>').appendTo($("#update_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_result"));
	});

}



function createGist(repository) {
	var url = API_BASE_URL + '/gists';
	var data = JSON.stringify(repository);

	$("#create_result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Created</div>').appendTo($("#create_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
	});
  }


function deleteRepo(gist_id) {
	var url = API_BASE_URL + '/gists/'+gist_id;
	$("#delete_result").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Deleted</div>').appendTo($("#delete_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#delete_result"));
	});


}

