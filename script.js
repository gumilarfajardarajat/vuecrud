$(document).ready(function(){
    $('#add-save').click(function(){
        $('#overlayadd').addClass("caution");
        setTimeout(function() {
            $('#add-modal').modal('hide');
            $(".add-input").val("");
            $('#overlayadd').removeClass("caution");
            $('.add-validation').hide()
            $("#add-save").attr("disabled", true); 
        }, 1000);
    });

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
      itemAddres:"",
      target: null,
    }
  },
  methods:{
    showDetailModal:function(event){
        var id = event.currentTarget.dataset.id;
        axios
        .get('https://jsonplaceholder.typicode.com/users/'+id)
        .then(response => {
            this.item = response.data;
            item = this.item;
            this.itemAddres =  item.address.street +', '+  item.address.suite +', '+ item.address.city +', '+ item.address.zipcode;
            $('#show-modal').modal('show');
            
        })
    },
    editSave:function(event){
        $('#overlayshow').addClass("caution");
        setTimeout(function() {
            $('#show-modal').modal('hide');
            $(".show-input").val("");
            $('#overlayshow').removeClass("caution");
            $('.show-validation').hide()
        }, 1000);
    },
    showDeleteModal:function(event){
        var id = event.currentTarget.dataset.id;
        axios
        .get('https://jsonplaceholder.typicode.com/users/'+id)
        .then(response => {
            this.item = response.data;            
            $('#delete-modal').modal('show');
        })
    },
    deleteData:function(){
        id = this.item.id;
        axios
        .delete('https://jsonplaceholder.typicode.com/users/'+id)
        .then(response => {
            var selector = "[data-row=id]";
            selector = selector.replace("id", id);
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

