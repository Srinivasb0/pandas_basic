const request = require('request');

const Alexa = require('ask-sdk-core');

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}


const STREAMS = [
  {
    "token": "stream-12",
    "url": 'https://s3.amazonaws.com/myhelloworldtesting/musicalbum/Merupula+Merisina+-+SenSongsMp3.Co.mp3',
    "metadata" : {
      "title": "Stream One",
      "subtitle": "A subtitle for stream one",
      "art": {
        "sources": [
          {
            "contentDescription": "example image",
            "url": "https://s3.amazonaws.com/cdn.dabblelab.com/img/audiostream-starter-512x512.png",
            "widthPixels": 512,
            "heightPixels": 512
          }
        ]
      },
      "backgroundImage": {
        "sources": [
          {
            "contentDescription": "example image",
            "url": "https://s3.amazonaws.com/cdn.dabblelab.com/img/wayfarer-on-beach-1200x800.png",
            "widthPixels": 1200,
            "heightPixels": 800
          }
        ]
      }
    }
  }
];

// const LaunchRequestHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
//   },
//   handle(handlerInput) {

//     let stream = STREAMS[0];

//     handlerInput.responseBuilder
//       .speak(`starting ${stream.metadata.title}`)
//       .addAudioPlayerPlayDirective('REPLACE_ALL', stream.url, stream.token, 0, null, stream.metadata);

//     return handlerInput.responseBuilder
//       .getResponse();
//   },
// };

const title = 'My Title';
const text = 'My primary text';
const largeImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/Browny_1200_800.png';

const textContent = new Alexa.RichTextContentHelper()
  .withPrimaryText(text)
  .getTextContent();

const image = new Alexa.ImageHelper()
  .withDescription('alexa')
  .addImageInstance('https://mediadownloads.mlb.com/mlbam/2017/09/12/images/mlbf_1826778783_th_45.jpg')
  .getImage();
  
const template = {
  type: 'BodyTemplate2',
  backButton: 'HIDDEN',
  backgroundImage: image,
  title,
  textContent
};


const itemlist = [
    {
      "token": "string",
      "textContent": "Sample Text" 
    },
    {
      "token": "string1",
      "textContent": "Sample Text2" 
    }
  ];

const listtemplate = {
  type: "ListTemplate1",
  title: "sample text 1",
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    var smallImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/Browny_720_480.png';
    var largeImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/Browny_1200_800.png';
   
    const speakout = `Hello Choose the Title From List. Base Ball Game Rules. Bangalore History.  Eating Healthy. The Little Mermaid`;
    
    return handlerInput.responseBuilder
      .speak(speakout)
      .withStandardCard("Story List", "Base Ball Game Rules \n Bangalore History \n Eating Healthy \n The Little Mermaid", smallImageUrl, largeImageUrl)
      .reprompt("Hello Choose the title from list")
      //.addRenderTemplateDirective(listtemplate)
      .getResponse();
  },
};

//Play Stream Intent Handler

const PlayStreamIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (
        handlerInput.requestEnvelope.request.intent.name === 'PlayStreamIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOnIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOnIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent'
        
        );
  },
  
  handle(handlerInput) {
    let stream = STREAMS[0];
    console.log("Error is")
    handlerInput.responseBuilder
      .speak(`starting ${stream.metadata.title}`)
      .addAudioPlayerPlayDirective('REPLACE_ALL', stream.url, stream.token, 0, null, stream.metadata);
      
    return handlerInput.responseBuilder
      .withShouldEndSession(true)
      .getResponse();
    
  },
};



//Base Ball Game Intent

const BaseBallGameRulesIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BaseBallGameIntent';
  },
  handle(handlerInput) {
      
    var options = {
    url: 'http://ec2-52-13-116-23.us-west-2.compute.amazonaws.com/story/baseball_game_rules/',
    method: 'GET',
    headers: headers,  
    };
    
    var smallImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/baseball_720_480.jpeg';
    var largeImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/baseball_1200_800.jpg';
    
    return new Promise((resolve, reject) => {
    httpGet(options).then((response) => {
      const speakout = response + "             " +  "Ask a Question from Passage By saying Browny"
        resolve(handlerInput.responseBuilder
        .speak(speakout)
        .withStandardCard("Base Ball Game Rules", response, smallImageUrl, largeImageUrl)
        .reprompt("Ask a Question from Passage By saying Browny")
        .getResponse());
      })
    });
  },
};


//Bangalore History Intent
const BangaloreHistoryIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BangaloreHistoryIntent';
  },
  handle(handlerInput) {
      
    var options = {
    url: 'http://ec2-52-13-116-23.us-west-2.compute.amazonaws.com/story/bangalore_history/',
    method: 'GET',
    headers: headers,  
    };
    
    var smallImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/bangalorepalace_720_480.jpeg';
    var largeImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/bangalorepalace_1200_800.jpeg';
    
    return new Promise((resolve, reject) => {
    httpGet(options).then((response) => {
      const speakout = response + "             " +  "Ask a Question from Passage By saying Browny"
        resolve(handlerInput.responseBuilder
        .speak(speakout)
        .withStandardCard("Bangalore History", response, smallImageUrl, largeImageUrl)
        .reprompt("Ask a Question from Passage By saying Browny")
        .getResponse());
      })
    });
  },
};


//The Little Mermaid Intent
const TheLittleMermaidIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TheLittleMermaidIntent';
  },
  handle(handlerInput) {
      
    var options = {
    url: 'http://ec2-52-13-116-23.us-west-2.compute.amazonaws.com/story/the_little_mermaid/',
    method: 'GET',
    headers: headers,  
    };
    
    var smallImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/littlemermaid_720_480.jpeg';
    var largeImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/littlemermaid_1200_800.jpeg';
    
    return new Promise((resolve, reject) => {
    httpGet(options).then((response) => {
      const speakout = response + "             " +  "Ask a Question from Passage By saying Browny"
        resolve(handlerInput.responseBuilder
        .speak(speakout)
        .withStandardCard("The Little Mermaid", response, smallImageUrl, largeImageUrl)
        .reprompt("Ask a Question from Passage By saying Browny")
        .getResponse());
      })
    });
  },
};



//Eating Healthy Intent
const EatingHealthyIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'EatingHealthyIntent';
  },
  handle(handlerInput) {
      
    var options = {
    url: 'http://ec2-52-13-116-23.us-west-2.compute.amazonaws.com/story/eating_healthy/',
    method: 'GET',
    headers: headers,  
    };
    
    var smallImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/eating_healthy_720_480.jpeg';
    var largeImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/eating_healthy_12800_800.jpeg';
    
    return new Promise((resolve, reject) => {
    httpGet(options).then((response) => {
      const speakout = response + "             " +  "Ask a Question from Passage By saying Browny"
        resolve(handlerInput.responseBuilder
        .speak(speakout)
        .withStandardCard("Eating Healthy - by Andrew Frinkle", response, smallImageUrl, largeImageUrl)
        .reprompt("Ask a Question from Passage By saying Browny")
        .getResponse());
      })
    });
  },
};


//POST Intent Handler
const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  
  handle(handlerInput) {
    const query = handlerInput.requestEnvelope.request.intent.slots.Query.value; 
    var options = {
    url: 'http://ec2-52-13-116-23.us-west-2.compute.amazonaws.com/story/all_stories/',
    method: 'GET',
    headers: headers,  
    };
    
    var smallImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/Browny_720_480.png';
    var largeImageUrl = 'https://s3.amazonaws.com/myhelloworldtesting/Browny_1200_800.png';
    return new Promise((resolve, reject) => {
      httpPost(query, options).then((response) => {
        const speakout = "The answer for" + query + "is     " + response
        resolve(handlerInput.responseBuilder
        .speak(speakout)
        .withStandardCard(query, response, smallImageUrl, largeImageUrl)
        .reprompt("Say Stop to close the Session")
        .getResponse());
      })
    })
  }
}


// HELP Intent Handler
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'This skill plays stories';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

// const PauseIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent'
//   },
//   handle(handlerInput) {
//     return handlerInput.responseBuilder
//       .speak("Hello Text")
//       .getResponse();
//   }
// }

// Cancel Intent Handler
// const CancelAndStopIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && (
//         handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
//         handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent' ||
//         handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOffIntent' ||
//         handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOffIntent');
//   },
//   handle(handlerInput) {
    
//     return handlerInput.responseBuilder
//       .addAudioPlayerClearQueueDirective('CLEAR_ALL')
//       .addAudioPlayerStopDirective()
//       .getResponse();
//   },
// };

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
    (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent' ||
    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
      );
    
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Good Bye")
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective()
      .withShouldEndSession(true)
      .getResponse();
  },
};


//Playback Stopped Intent Handler
const PlaybackStoppedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'PlaybackController.PauseCommandIssued' ||
            handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped';
  },
  
  handle(handlerInput) {
    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective();
    return handlerInput.responseBuilder
      .getResponse();
  },
};


// //AudioPlayer.PlaybackStarted
const PlaybackStartedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED')
      .getResponse();
  }
}





 const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};




// SKILL Registration

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PlayStreamIntentHandler,
    BaseBallGameRulesIntentHandler,
    BangaloreHistoryIntentHandler,
    TheLittleMermaidIntentHandler,
    EatingHealthyIntentHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    //PauseIntentHandler,
    CancelAndStopIntentHandler,
    PlaybackStoppedIntentHandler,
    PlaybackStartedIntentHandler,
    SessionEndedRequestHandler,
    ErrorHandler,
  )
  .lambda(); 
  
//Promise Then GET Request(async)  
  
function httpGet(options) {
    return new Promise((resolve, reject) => {
        request(options, function(error, response, body){
            body = body.toString('utf-8');
            var json_title = JSON.parse(body)['title'];
            var json_passage = JSON.parse(body)['story'];
            return resolve(json_passage);
        });
    });
}


//Promise Then POST Request(async)

function httpPost(query, options) {
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
        body = body.toString('utf-8');
        var json_title = JSON.parse(body)['title'];
        var json_passage = JSON.parse(body)['story']
        
        var postOptions = {
        url: 'http://ec2-52-13-116-23.us-west-2.compute.amazonaws.com/qanda/',
        method: 'POST',
        headers: headers,
        form: {'title': json_title, 'question': query, 'passage': json_passage}
      };
        request(postOptions, function(error, response, body) {
            body = body.toString('utf-8');
            var jsonAnswer = JSON.parse(body)['answer'];
            return resolve(jsonAnswer)
        })
    })
  })
}
