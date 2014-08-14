(function(){
  'use strict';

  $(document).ready(function(){
    $('.assetName a').click(sellAsset);
    $('.addGambler').click(addGambler);
  });



  //PRIVATE FUNCTIONS
  //----------------
  //----------------
  function sellAsset(e){
    var $asset = $(this),
        id = $(this).attr('data-gambler-id'),
        assetName = $(this).text();

    $.ajax({
      url: '/gamblers/' + id + '/assets/' + assetName,
      type: 'delete',
      data: 'json',
      success: function(data){
        console.log(data);
        $asset.closest('.asset').fadeOut();
      }
    });

    e.preventDefault();
  }


  function addGambler(e){
    var $form = $(this).closest('form'),
        data = $form.serialize,
        type = $form.attr('method'),
        url = $form.attr('action');

    $.ajax({
      url: url,
      type: type,
      data: data,
      dataType: 'html',
      success: function(html){
        var $gambler = $(html);
        $('#gamblers').append($gambler);
        console.log(html);
      }
    });

    e.preventDefault();

  }

})();

