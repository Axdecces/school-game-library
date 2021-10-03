from django.urls import path

from api import views

app_name = 'api'
urlpatterns = [
	# Game URLs
	path('games/', views.GameList.as_view(), name='games'),
	path('games/deleted/', views.GameList.as_view(), { 'deleted': True }, name='games_deleted'),
    path('games/<int:game_id>/', views.GameDetail.as_view(), name='game'),
    path('games/<int:game_id>/image/', views.ImageDetail.as_view(), name='game'),
    path('games/<int:game_id>/delete/', views.GameDelete.as_view(), name='game_delete'),
    path('games/<int:game_id>/soft-delete/', views.GameDelete.as_view(), { 'soft_delete': True }, name='game_soft_delete'),
    path('games/<int:game_id>/restore/', views.GameRestore.as_view(), name='game_restore'),
	# Tag URLs
	path('tags/', views.TagList.as_view(), name='tags'),
	path('tags/deleted', views.TagList.as_view(), { 'deleted': True }, name='tags'),
    path('tags/<int:tag_id>/', views.TagDetail.as_view(), name='tag'),
    path('tags/<int:tag_id>/delete/', views.TagDelete.as_view(), name='tag_delete'),
    path('tags/<int:tag_id>/soft-delete/', views.TagDelete.as_view(), { 'soft_delete': True }, name='tag_soft_delete'),
    path('tags/<int:tag_id>/restore/', views.TagRestore.as_view(), name='tag_restore'),
]

