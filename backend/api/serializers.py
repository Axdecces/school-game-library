from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from .models import Game, Tag

class GameSerializer(serializers.ModelSerializer):
	image = Base64ImageField()
	class Meta:
		model = Game
		fields = ['id', 'title', 'description', 'tags', 'rating', 'is_favorite', 'image']

class TagSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tag
		fields = ['id', 'title']
