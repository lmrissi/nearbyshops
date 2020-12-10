from django.contrib.gis.db import models

class shops (models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField()
    adress = models.CharField(max_length=100)
    city = models.CharField(max_length=50)