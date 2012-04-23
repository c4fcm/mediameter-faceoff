(function($){

  //View ListView
  var SplashView = Backbone.View.extend({
    
    MAX_BAR_WIDTH: 250,
    
    events: {
      "change #right_newspaper": "drawNewspaperComparison",
      "change #left_newspaper": "drawNewspaperComparison",
      "click #1979": "year1979",
      "click #1989": "year1989",
      "click #1999": "year1999",
      "click #2009": "year2009"
    },

    initialize: function(){
      _.bindAll(this, 'render');
      _.bindAll(this, 'loadNewspaperData');
      _.bindAll(this, 'loadNewspaperData');
      _.bindAll(this, 'year1979');
      _.bindAll(this, 'year1989');
      _.bindAll(this, 'year1999');
      _.bindAll(this, 'year2009');
      this.year = 1979;
      this.loadNewspaperData();
      this.render();
    },
     
    render: function(){
     $(this.el).load("templates/selection.template");
    },

   loadNewspaperData: function(){
     var that = this;
     jQuery.getJSON("data/newspaper_data.json", function(data){
       that.newspaperData = data;
     });

   },

    drawNewspaperComparison: function(){
      var that = this;
      this.left_newspaper = $('#left_newspaper').val();
      this.right_newspaper = $('#right_newspaper').val();
      this.left_news_data = this.newspaperData[this.left_newspaper];
      this.right_news_data = this.newspaperData[this.right_newspaper];

      $.ajax({url:"templates/gender.template", 
              type: "GET",
              dataType: "text",
              success: function(data){
                $("#gender-comparison").html(_.template(data, {
                    maxBarWidth: that.MAX_BAR_WIDTH,
                    year: that.year, 
                    sourceA: that.left_newspaper, 
                    dataA: { female: that.left_news_data[that.year].female_author / that.left_news_data[that.year].total_articles,
                             male: that.left_news_data[that.year].male_author / that.left_news_data[that.year].total_articles,
                             unknown: (that.left_news_data[that.year].unknown_gender_author + that.left_news_data[that.year].no_author) / that.left_news_data[that.year].total_articles
                             },
                    sourceB: that.right_newspaper, 
                    dataB: { female: that.right_news_data[that.year].female_author / that.right_news_data[that.year].total_articles,
                             male: that.right_news_data[that.year].male_author / that.right_news_data[that.year].total_articles,
                             unknown: (that.right_news_data[that.year].unknown_gender_author + that.right_news_data[that.year].no_author) / that.right_news_data[that.year].total_articles
                             },
                    }));
            }});

      $.ajax({url:"templates/topic.template", 
              type: "GET",
              dataType: "text",
              success: function(data){
                $("#sports-comparison").html(_.template(data, {
                    topic: 'sports',
                    topicTitle: 'Sports',
                    topicDescription: "What percentage of articles were about sports coverage?",
                    maxBarWidth: that.MAX_BAR_WIDTH,
                    year: that.year, 
                    sourceA: that.left_newspaper, 
                    dataA: that.left_news_data[that.year].sports / that.left_news_data[that.year].total_articles,
                    sourceB: that.right_newspaper, 
                    dataB: that.right_news_data[that.year].sports / that.right_news_data[that.year].total_articles,
                    }));
            }});

      $.ajax({url:"templates/topic.template", 
              type: "GET",
              dataType: "text",
              success: function(data){
                $("#foreign-comparison").html(_.template(data, {
                    topic: 'foreign',
                    topicTitle: 'Foreign',
                    topicDescription: "What percentage of articles were about countries that weren't involved with the US?",
                    maxBarWidth: that.MAX_BAR_WIDTH,
                    year: that.year, 
                    sourceA: that.left_newspaper, 
                    dataA: that.left_news_data[that.year].foreign / that.left_news_data[that.year].total_articles,
                    sourceB: that.right_newspaper, 
                    dataB: that.right_news_data[that.year].foreign / that.right_news_data[that.year].total_articles,
                    }));
            }});

      $.ajax({url:"templates/topic.template", 
              type: "GET",
              dataType: "text",
              success: function(data){
                $("#international-comparison").html(_.template(data, {
                    topic: 'international',
                    topicTitle: 'International',
                    topicDescription: "What percentage of articles were about countries that were involved with the US?",
                    maxBarWidth: that.MAX_BAR_WIDTH,
                    year: that.year, 
                    sourceA: that.left_newspaper, 
                    dataA: that.left_news_data[that.year].international / that.left_news_data[that.year].total_articles,
                    sourceB: that.right_newspaper, 
                    dataB: that.right_news_data[that.year].international / that.right_news_data[that.year].total_articles,
                    }));
            }});

      $.ajax({url:"templates/topic.template", 
              type: "GET",
              dataType: "text",
              success: function(data){
                $("#arts-comparison").html(_.template(data, {
                    topic: 'arts',
                    topicTitle: 'Arts',
                    topicDescription: "What percentage of articles were about popular culture or the arts?",
                    maxBarWidth: that.MAX_BAR_WIDTH,
                    year: that.year, 
                    sourceA: that.left_newspaper, 
                    dataA: that.left_news_data[that.year].arts / that.left_news_data[that.year].total_articles,
                    sourceB: that.right_newspaper, 
                    dataB: that.right_news_data[that.year].arts / that.right_news_data[that.year].total_articles,
                    }));
            }});

    },
  
    year1979: function(){
      this.changeYear(1979);
    },
    year1989: function(){
      this.changeYear(1989);
    },
    year1999: function(){
      this.changeYear(1999);
    },
    year2009: function(){
      this.changeYear(2009);
    },

    changeYear: function(new_year){
      this.year = new_year
      years = [1979, 1989, 1999, 2009];
      for( year in years){
        year = years[year];
        if( new_year == year){
           $('#'+year.toString()).attr("src", "images/" + new_year.toString() + "_selected.png");
        }else{
           $('#'+year.toString()).attr("src", "images/" + year.toString() + "_unselected.png");
        }
      }
      this.drawNewspaperComparison();
    }
  
    
  });
  var splashView = new SplashView;
  $("#frame").html(splashView.el);
})(jQuery);
