from django.urls import path

from . import views
# from .views import scrape_articles

urlpatterns = [
    # path("", views.index, name="index"),
    path('scrape_articles', views.scrape_articles, name='scrape_articles'),
    path("api", views.home, name='home'),
    path("articles/<id>", views.articles, name='articles'),
    path("receive_data", views.receive_data, name = 'receive_data')

]
