from django.shortcuts import render
from django.views import generic
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from .models import shops
from django.http import HttpResponse
from django.core.serializers import serialize

longitude = -80.191788
latitude = 25.761681

user_location = Point(longitude, latitude, srid=4326)

class Home(generic.ListView):
    model = shops
    context_object_name = 'shops'
    queryset = shops.objects.annotate(distance=Distance('location', user_location)).order_by('distance')[0:6]
    template_name = 'shops/index_bootstrap.html'

    def shops_dataset(request):
        shops_geojson = serialize('geojson', shops.objects.annotate(distance=Distance('location', user_location)).order_by('distance')[0:6])
        return HttpResponse(shops_geojson, content_type='json')

home = Home.as_view()