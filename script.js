$(document).ready(function(){
//     $('#add-save').click(function(){
//         $('#overlayadd').addClass("caution");
//         setTimeout(function() {
//             $('#add-modal').modal('hide');
//             $(".add-input").val("");
//             $('#overlayadd').removeClass("caution");
//             $('.add-validation').hide()
//             $("#add-save").attr("disabled", true); 
//         }, 1000);
//     });

    // $('#show-save').click(function(){ 
    //     $('#overlayshow').addClass("caution");
    //     setTimeout(function() {
    //         $('#show-modal').modal('hide');
    //         $(".show-input").val("");
    //         $('#overlayshow').removeClass("caution");
    //         $('.show-validation').hide()
    //     }, 1000);
    // });


    // $('#add-delete').click(function(){
    //     $('#overlaydelete').addClass("caution");
    //     setTimeout(function() {
    //         $('#delete-modal').modal('hide');
    //         $('#overlaydelete').removeClass("caution");
    //     }, 1000);
    // });


    $(".add-input").focusout(function(event){
        var targetClass = "."+event.currentTarget.id;
        var val = event.currentTarget.value;
        if(val == ""){
            $(targetClass).show();
        }else{
            $(targetClass).hide();
        }    
    });

    $(".show-input").focusout(function(event){
        var targetClass = "."+event.currentTarget.id;
        var val = event.currentTarget.value;
        if(val == ""){
            $(targetClass).show();
        }else{
            $(targetClass).hide();
        }    
    });

    $(".add-input").on('input',function(event){
        var n = $(".add-input").length;
        var cond = [false,false,false,false,false]
    
        for (let i = 0; i < n; i++) {
            var temp = $(".add-input")[i].value;
            if(temp != ""){
                cond[i] = true;
            }
        }
    
        if(cond[0] && cond[1] && cond[2] && cond[3] && cond[4]){
            $("#add-save").attr("disabled", false);         
        }else{
            $("#add-save").attr("disabled", true); 
        }

    });


    $(".show-input").on('input',function(event){
        var n = $(".show-input").length;
        var cond = [false,false,false,false,false]
    
        for (let i = 0; i < n; i++) {
            var temp = $(".show-input")[i].value;
            if(temp != ""){
                cond[i] = true;
            }
        }
    
        if(cond[0] && cond[1] && cond[2] && cond[3] && cond[4]){
            $("#show-save").attr("disabled", false);         
        }else{
            $("#show-save").attr("disabled", true); 
        }

    });





});


new Vue({
  el: '#app',
  data () {
    return {
      items: null,
      item: "",
      id:"",
      itemAddres:"",
      target: null,
      form : {
          name : "",
          username : "",
          email : "",
          address : "",
          phone : ""
      },
    }
  },
  methods:{
    resetform:function(){
        this.form.name = "";
        this.form.username = "";
        this.form.email = "";
        this.form.address = "";
        this.form.phone = "";
    },
    showAddModal:function(){
        this.resetform();
        $('.add-validation').hide()
        $('#add-modal').modal('show');
    },
    showDetailModal:function(event){
        var id = event.currentTarget.dataset.id;
        axios
        .get('https://jsonplaceholder.typicode.com/users/'+id)
        .then(response => {
            item = response.data;
            this.id = id;
            this.form.name = item.name;
            this.form.username = item.username;
            this.form.email = item.email;
            this.form.address = item.address.street +', '+  item.address.suite +', '+ item.address.city +', '+ item.address.zipcode;
            this.form.phone = item.phone;
            $('#show-modal').modal('show');
        })
    },
    editSave:function(){
        axios
        .put('https://jsonplaceholder.typicode.com/users/'+this.id,this.form)
        .then(response => {
            console.log(response.data);
            $('#overlayshow').addClass("caution");
            setTimeout(function() {
                $('#show-modal').modal('hide');
                $(".show-input").val("");
                $('#overlayshow').removeClass("caution");
                $('.show-validation').hide()
            }, 1000);
            var selector = "[data-row=id] ";
            selector = selector.replace("id", this.id);
            $(selector + ".col-name").html(this.form.name);
            $(selector + ".col-username").html(this.form.username);
            $(selector + ".col-email").html(this.form.email);
            $(selector + ".col-address").html(this.form.address);
            $(selector + ".col-phone").html(this.form.phone);
        });

    },
    showDeleteModal:function(event){
        var id = event.currentTarget.dataset.id;
        axios
        .get('https://jsonplaceholder.typicode.com/users/'+id)
        .then(response => {
            this.id = id;            
            $('#delete-modal').modal('show');
        })
    },
    addData:function(){
        axios
        .post('https://jsonplaceholder.typicode.com/users/',this.form)
        .then(response => {
            $('#overlayadd').addClass("caution");
            setTimeout(function() {
                $('#add-modal').modal('hide');
                $(".add-input").val("");
                $('#overlayadd').removeClass("caution");
                $('.add-validation').hide()
                $("#add-save").attr("disabled", true); 
            }, 1000);
            
            newID = $("tr").length+1;


            var tdId = '<td class="col-id">'+newID+'</td>';
            var tdName = '<td class="col-name">'+this.form.name+'</td>';
            var tdUsername = '<td class="col-username">'+this.form.username+'</td>';
            var tdEmail = '<td class="col-email">'+this.form.email+'</td>';
            var tdAddress = '<td class="col-address">'+this.form.address+'</td>';
            var TdPhone = '<td class="col-phone">'+this.form.phone+'</td>';
            var TdAction = '<td> <div class="row"> <button class="btn btn-primary btn-sm mr-1" v-on:click="showDetailModal($event)" v-bind:data-id="'+newID+'"><i class="fa fa-pencil-square-o"></i></button><button class="btn btn-danger btn-sm " v-on:click="showDeleteModal($event)" v-bind:data-id="'+newID+'"><i class="fa fa-trash"></i></button></div></td>'

            tdId.replace("target","newID");
            tdName.replace("target",this.form.name);
            tdUsername.replace("target",this.form.username);
            tdEmail.replace("target",this.form.email);
            tdAddress.replace("target",this.form.address);
            TdPhone.replace("target",this.form.phone);
            TdAction.replace("target",newID);

            console.log(tdId);
            

            $("tbody").append(tdId,tdName,tdUsername,tdEmail,tdAddress,TdPhone,TdAction)

            this.resetform();
            console.log(response.status);
            
        })

    },
    deleteData:function(){
        axios
        .delete('https://jsonplaceholder.typicode.com/users/'+this.id)
        .then(response => {
            var selector = "[data-row=id]";
            selector = selector.replace("id", this.id);
            $(selector).remove()
            console.log(response.status);
            // $("[data-row=1] .col-id").html()
        })

        $('#overlaydelete').addClass("caution");
        setTimeout(function() {
            $('#delete-modal').modal('hide');
            $('#overlaydelete').removeClass("caution");
        }, 1000);
    },
  },
  mounted () {
    axios
      .get('https://jsonplaceholder.typicode.com/users/')
      .then(response => {
        this.items = response.data;
        $(document).ready(function() {
            $('#example').DataTable();
        });
      })
  }
})

