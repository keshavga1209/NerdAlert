from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("", include("hello.urls")),
    path("admin/", admin.site.urls),
    # path("scrape/", include("scrape_articles.urls")),
    # path('scrape/', scrape_articles, name='scrape_articles'),
]