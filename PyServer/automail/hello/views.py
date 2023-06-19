from django.http import HttpResponse

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
#from pymongo import MongoClient
import requests
import json
from bs4 import BeautifulSoup

def index(request):
    return HttpResponse("Hello, world. We are just getting started.")

def home(request):
    response=requests.get('https://jsonplaceholder.typicode.com/posts').json()
    print(response)
    return render(request, 'hello/home.htm', {'response': response})

def articles(email, search_terms):
    search_term = "LLM"
    page_no = 1

    headers = {
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://ieeexplore.ieee.org",
        "Content-Type": "application/json",
    }
    # payload = {
    #     "newsearch": True,
    #     "queryText": search_term,
    #     "highlight": True,
    #     "returnFacets": ["ALL"],
    #     "returnType": "SEARCH",
    #     "pageNumber": page_no
    # }
    page_datas = []
    result = []
    for i in search_terms:
        r = requests.post(
                "https://ieeexplore.ieee.org/rest/search",
                json={
                    "newsearch": True,
                    "queryText": i,
                    "highlight": True,
                    "returnFacets": ["ALL"],
                    "returnType": "SEARCH",
                    "pageNumber": page_no,
                    "rowsPerPage":2 ,
                    "sortType": "newest"
                },
                headers=headers
            )
        page_data = r.json()
        if "records" not in page_data:
             result.append({})
        else:
            for record in page_data["records"]:
                subResult = {}
                subResult["title"] = record["articleTitle"]
                subResult["link"] = 'https://ieeexplore.ieee.org'+record["documentLink"]
                result.append(subResult)
 
    final_result = {"email": email, "papers": result}
    json_object = json.dumps(final_result, indent = 4) 
    print(type(json_object))
    
    return (json_object)

def send_data_to_node(data):
    url = 'http://localhost:8081/bifrost/sendPapers'
    headers = {'Content-Type': 'application/json'}
    # response = requests.post(url, json=data, headers=headers)
    # payload = json.dumps(data)
    response = requests.request("POST", url, headers=headers, data=data)
    
    # Check the response status
    if response.status_code == 201:
        print('Data sent successfully to Node.js server')
    else:
        print(response.status_code)
        print('Failed to send data to Node.js server')

@csrf_exempt 
def receive_data(request):
    if request.method=='POST':
            received_json_data=json.loads(request.body)
            print("hello -------- hello")
            print(received_json_data)
        
            fetched_articles = articles(received_json_data[0], received_json_data[1:])
            # print(fetched_articles)
            # print(type(fetched_articles))
            send_data_to_node(fetched_articles)
            return HttpResponse(fetched_articles)
            # return HttpResponse('it was post request: '+str(received_json_data))
    
    return HttpResponse('it was GET request')

def scrape_articles(request):
    # Establish a connection to MongoDB
    # client = MongoClient()
    # db = client['your_database_name']  # Replace with your MongoDB database name
    # collection = db['user_preferences']  # Replace with your user preferences collection name

    # Fetch user preferences from the MongoDB collection
    # user_preferences = collection.find({})

    # Process user preferences and scrape articles
    # for preference in user_preferences:
    #     preferences = preference['preferences']

        # Scrape articles from IEEE website based on user preferences
        preferences = ["machine learnig", "generative models"]
        articles = []
        for pref in preferences:
            url = f'https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={pref}&highlight=true&returnFacets=ALL&returnType=SEARCH&matchPubs=true&pageNumber=1'
            response = requests.get(url)
            print(response)
            soup = BeautifulSoup(response.text, 'html.parser')
            article_elements = soup.find_all('h2', class_='result-item-title')
            for element in article_elements[:5]:  # Fetching only the first 5 articles
                title = element.get_text().strip()
                articles.append(title)

        # Print or process the scraped articles as per your requirements
        for article in articles:
            print(article)

        return render(request, 'hello/scraped.html', {'articles': articles})
