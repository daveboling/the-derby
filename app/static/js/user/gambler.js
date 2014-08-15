(function(){
  'use strict';

  $(document).ready(function(){
    $('.assetName a').click(sellAsset);
    $('.addAsset').click(addAsset);
    $('.addGambler').click(addGambler);
  });



  //PRIVATE FUNCTIONS
  //----------------
  //----------------


  //SELL ASSET
  function sellAsset(e){
    var $asset = $(this),
        id = $(this).attr('data-gambler-id'),
        assetName = $(this).text();

    $.ajax({
      url: '/gamblers/' + id + '/assets/' + assetName,
      type: 'delete',
      data: 'json',
      success: function(data){
        $asset.closest('.asset, .assetOverview').fadeOut();
      }
    });

    e.preventDefault();
  }


  //ADD ASSET
  function addAsset(e){
    var $form = $(this).closest('form'),
        data = $form.serialize,
        type = $form.attr('method'),
        url = $form.attr('action');

    $.ajax({
      url: url,
      type: type,
      data: data,
      success: function(){
      }
    });

    e.preventDefault();
  }

  //ADD GAMBLER
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
      }
    });

    e.preventDefault();

  }



})();

