from rest_framework.viewsets  import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from api.models import Game, Tag
from api.serializers import GameSerializer, TagSerializer

class GameViewSet(ModelViewSet):
	queryset = Game.objects.all()
	serializer_class = GameSerializer

	@action(detail=True, methods=['POST'], url_path='soft-delete')
	def soft_delete(self, request, pk=None):
		game = self.get_object()
		game.soft_delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
	
	@action(detail=True, methods=['POST'], url_path='restore')
	def restore(self, request, pk=None):
		game = self.get_object()
		game.restore()
		return Response(status=status.HTTP_204_NO_CONTENT)
	
class TagViewSet(ModelViewSet):
	queryset = Tag.objects.all()
	serializer_class = TagSerializer
