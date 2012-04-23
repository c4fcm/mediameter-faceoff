(function($){

  //View ListView
  var SplashView = Backbone.View.extend({
    
    MAX_BAR_WIDTH: 230,
    
    events: {
      "change #first-newspaper-control":    "drawNewspaperComparison",
      "change #second-newspaper-control":   "drawNewspaperComparison",
      "change #year-control":               "drawNewspaperComparison",
    },

    initialize: function(){
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
      this.year = $('#year-control').val();
      this.left_newspaper = $('#first-newspaper-control').val();
      this.right_newspaper = $('#second-newspaper-control').val();
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
                    topicTitle: 'Sports Coverage',
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
                    topicTitle: 'Foreign Coverage',
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
                    topicTitle: 'International Coverage',
                    topicDescription: "What percentage of articles were about countries where the US had concerns?",
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
                    topicTitle: 'Arts Coverage',
                    topicDescription: "What percentage of articles were about popular culture or the arts?",
                    maxBarWidth: that.MAX_BAR_WIDTH,
                    year: that.year, 
                    sourceA: that.left_newspaper, 
                    dataA: that.left_news_data[that.year].arts / that.left_news_data[that.year].total_articles,
                    sourceB: that.right_newspaper, 
                    dataB: that.right_news_data[that.year].arts / that.right_news_data[that.year].total_articles,
                    }));
            }});

    }

  });
  var splashView = new SplashView;
  $("#frame").html(splashView.el);
})(jQuery);
