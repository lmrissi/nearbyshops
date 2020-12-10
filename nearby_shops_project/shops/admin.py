from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import shops

@admin.register(shops)
class shopsAdmin(OSMGeoAdmin):
    list_display = ('name', 'location')