from django.contrib import admin
from .models import Game, Tag

class GameAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description', 'rating','is_deleted']

class TagAdmin(admin.ModelAdmin):
	list_display = ['title']

# Register your models here.

admin.site.register(Game, GameAdmin)
admin.site.register(Tag, TagAdmin)
