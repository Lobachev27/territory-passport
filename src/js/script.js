/*Табы*/

$(document).ready(function() {
  $(function () {
    var tabContainers = $('.content__container');
    tabContainers.hide().filter(':first').show();
    $('.content__tab').click(function () {
      tabContainers.hide();
      tabContainers.filter(this.hash).show();
      $('.content__tab').removeClass('active');
      $(this).addClass('active');
      return false;
    }).filter(':first').click();
  });
});

/*Раскрытие селекта*/

$(document).ready(function() {
  $('.select-simple .select-main').click(function(){
    if($(this).parent().hasClass('disabled')){
    } else {
      $('.select').removeClass('active');
      $(this).parent().addClass('active');
    }
  });

  $('.select-multi .select-main').click(function(){
    $('.select').removeClass('active');
    $(this).parent().addClass('active');
  });

  $('.select-simple .select-item').click(function(){
    $('.select-simple').removeClass('active');
    let txt = $(this).text();
    $(this).parent().parent().prev().children('span').text(txt);
  });
});
$(document).mouseup(function (e){
  var el = $(".select");
  if (!el.is(e.target) && el.has(e.target).length === 0) {
    el.removeClass('active');
  }
});

/*Раскрытие фильтра*/

$(document).ready(function() {
  $('.btn-filter').click(function(){
    $(this).closest('.content__box').find('.filter').addClass('active');
  });
  $('.filter__close').click(function(){
    $(this).closest('.filter').removeClass('active');
  });
});

/*Datepicker*/

$(document).ready(function() {
  const FLATPICKR_CUSTOM_YEAR_SELECT = 'flatpickr-custom-year-select';

  $('.datepicker').flatpickr({
    "dateFormat": "d.m.Y",
    "altFormat": "d.m.Y",
    "allowInput": true,
    "mode": "range",
    "locale": "ru",
    "minDate": "01.01.2020",
    "maxDate": "today",
    onChange: function () {
      $('.datepicker').blur();
    },
    onReady: function (selectedDates, dateStr, instance) {
      const flatpickrYearElement = instance.currentYearElement;

      const children = flatpickrYearElement.parentElement.children;
      for (let i in children) {
        if (children.hasOwnProperty(i)) {
          children[i].style.display = 'none';
        }
      }

      const yearSelect = document.createElement('select');
      const minYear = new Date(instance.config._minDate).getFullYear();
      const maxYear = new Date(instance.config._maxDate).getFullYear();
      for (let i = minYear; i < maxYear + 1; i++) {
        const option = document.createElement('option');
        option.value = '' + i;
        option.text = '' + i;
        yearSelect.appendChild(option);
      }
      yearSelect.addEventListener('change', function (event) {
        flatpickrYearElement.value = event.target['value'];
        instance.currentYear = parseInt(event.target['value']);
        instance.redraw();
      });

      yearSelect.className = 'flatpickr-monthDropdown-months';
      yearSelect.id = FLATPICKR_CUSTOM_YEAR_SELECT;
      yearSelect.value = instance.currentYearElement.value;

      flatpickrYearElement.parentElement.appendChild(yearSelect);
    },
    onMonthChange: function (selectedDates, dateStr, instance) {
      document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT).value = '' + instance.currentYear;
    }
  });
});

/*Настройки таблицы*/

$(document).ready(function() {
  $('.content__setting').click(function(){
    $(this).closest('.content__box').find('.setting').toggleClass('active');
  });
});
$(document).mouseup(function (e){
  var el = $(".setting");
  if (!el.is(e.target) && el.has(e.target).length === 0) {
    el.removeClass('active');
  }
});

/*Редактирование таблицы*/

$(document).ready(function() {
  $('.content__box').find('.table').find('.input').prop('disabled', true);

  $('.btn-change').click(function(){
    if ($(this).closest('.content__box').find('.table').hasClass("edit")) {
      $(this).text("Редактировать");
      $(this).closest('.content__box').find('.table').removeClass("edit");
      $(this).closest('.content__box').find('.table').find('.input').prop('disabled', true);
    } else {
      $(this).text("Сохранить");
      $(this).closest('.content__box').find('.table').addClass("edit");
      $(this).closest('.content__box').find('.table').find('.input').prop('disabled', false);
    }
  });
});

/*Input type file*/

$(document).ready(function() {

  (function() {

    // Browser supports HTML5 multiple file?
    var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
      isIE = /msie/i.test( navigator.userAgent );

    $.fn.customFile = function() {

      return this.each(function() {

        var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
          $wrap = $('<div class="file-upload-wrapper">'),
          $input = $('<div class="file-upload-input"></div>'),
          // Button that will be used in non-IE browsers
          $button = $('<button type="button" class="btn btn-whbk file-upload-button">Добавить</button>'),
          // Hack for IE
          $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Добавить</label>');

        // Hide by shifting to the left so we
        // can still trigger events
        $file.css({
          position: 'absolute'
        });

        $wrap.insertAfter( $file )
          .append( $file, $input, ( isIE ? $label : $button ) );

        // Prevent focus
        $file.attr('tabIndex', -1);
        $button.attr('tabIndex', -1);

        $button.click(function () {
          $file.focus().click(); // Open dialog
        });

        $file.change(function() {

          var files = [], fileArr, filename;

          // If multiple is supported then extract
          // all filenames from the file array
          if ( multipleSupport ) {
            fileArr = $file[0].files;
            for ( var i = 0, len = fileArr.length; i < len; i++ ) {
              files.push( fileArr[i].name );
            }
            filename = files.join(', ');

            // If not supported then just take the value
            // and remove the path to just show the filename
          } else {
            filename = $file.val().split('\\').pop();
          }

          $input.text( filename ) // Set the value
            .attr('title', filename) // Show filename in title tootlip
            .focus(); // Regain focus

        });

        $input.on({
          blur: function() { $file.trigger('blur'); },
          keydown: function( e ) {
            if ( e.which === 13 ) { // Enter
              if ( !isIE ) { $file.trigger('click'); }
            } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
              // On some browsers the value is read-only
              // with this trick we remove the old input and add
              // a clean clone with all the original events attached
              $file.replaceWith( $file = $file.clone( true ) );
              $file.trigger('change');
              $input.val('');
            } else if ( e.which === 9 ){ // TAB
              return;
            } else { // All other keys
              return false;
            }
          }
        });

      });

    };

    // Old browser fallback
    if ( !multipleSupport ) {
      $( document ).on('change', 'input.customfile', function() {

        var $this = $(this),
          // Create a unique ID so we
          // can attach the label to the input
          uniqId = 'customfile_'+ (new Date()).getTime(),
          $wrap = $this.parent(),

          // Filter empty input
          $inputs = $wrap.siblings().find('.file-upload-input')
            .filter(function(){ return !this.value }),

          $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

        // 1ms timeout so it runs after all other events
        // that modify the value have triggered
        setTimeout(function() {
          // Add a new input
          if ( $this.val() ) {
            // Check for empty fields to prevent
            // creating new inputs when changing files
            if ( !$inputs.length ) {
              $wrap.after( $file );
              $file.customFile();
            }
            // Remove and reorganize inputs
          } else {
            $inputs.parent().remove();
            // Move the input so it's always last on the list
            $wrap.appendTo( $wrap.parent() );
            $wrap.find('input').focus();
          }
        }, 1);

      });
    }

  }());

  $('input[type=file]').customFile();

});

/*Модальные окна*/

$(document).ready(function() {
  $('.js-popup').click(function(e){
    e.preventDefault();
    var id = $(this).attr('href');
    $(id).addClass('show');
    $('body').addClass('ov-hid');
  });

  $('.popup__close').click(function(){
    $(this).closest('.popup').removeClass('show');
    $('body').removeClass('ov-hid');
  });

  $(document).mouseup(function (e){
    var el = $(".popup__wrapper");
    if (!el.is(e.target) && el.has(e.target).length === 0) {
      el.closest('.popup').removeClass('show');
      $('body').removeClass('ov-hid');
    }
  });

  $(".icon-edit.js-popup").on('click', function() {
    var parentBox = $(this).closest('.table__item');

    var subdivision = parentBox.find('.table__item-col.col-sh2 span').text()
    var director = parentBox.find('.table__item-col.col-sh4 span').text()
    var directorTelephone = parentBox.find('.table__item-col.col-sh5 span').text()
    var dispatcher = parentBox.find('.table__item-col.col-sh6 span').text()
    var dispatcherTelephone = parentBox.find('.table__item-col.col-sh7 span').text()
    var email = parentBox.find('.table__item-col.col-sh8 span').text()

    var popupBox = $('#addSisShared .popup__wrapper');

    popupBox.find('.select').find('.select-main span').text(subdivision);
    popupBox.find(':input[name="director"]').attr("value", director);
    popupBox.find(':input[name="directorTelephone"]').attr("value", directorTelephone);
    popupBox.find(':input[name="dispatcher"]').attr("value", dispatcher);
    popupBox.find(':input[name="dispatcherTelephone"]').attr("value", dispatcherTelephone);
    popupBox.find(':input[name="email"]').attr("value", email);
  });

  $('#addSisShared .popup__close, #addSisShared .js-calcel').click(function(){
    $(this).closest('.popup').removeClass('show');
    $('body').removeClass('ov-hid');
    var popupBox = $('#addSisShared .popup__wrapper');
    popupBox.find('.select').find('.select-main span').text("Выбрать");
    popupBox.find(':input[name="director"]').attr("value", "");
    popupBox.find(':input[name="directorTelephone"]').attr("value", "");
    popupBox.find(':input[name="dispatcher"]').attr("value", "");
    popupBox.find(':input[name="dispatcherTelephone"]').attr("value", "");
    popupBox.find(':input[name="email"]').attr("value", "");
  });
});