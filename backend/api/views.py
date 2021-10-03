from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from api.models import Game, Tag
from api.serializers import GameSerializer, TagSerializer, ImageSerializer


class GameList(APIView):
	"""api view for listing games via get and creating new games via post"""

	def get(self, request, deleted=False):
		if deleted:
			games = Game.objects.filter(is_deleted=True)
		else:
			games = Game.objects.filter(is_deleted=False)
		
		serializer = GameSerializer(games, many=True)
		return Response(serializer.data)

	def post(self, request):
		serializer = GameSerializer(data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GameDetail(APIView):
	"""api view for getting a single game via get and updating a single game via post"""

	def get(self, request, game_id):
		game = Game.objects.get(id=game_id)
		serializer = GameSerializer(game)
		return Response(serializer.data)

	def post(self, request, game_id):
		game = Game.objects.get(id=game_id)
		serializer = GameSerializer(game, data=request.data, partial=True)
		
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameDelete(APIView):
	""" api view for deleting a single game via post """
	def post(self, request, game_id, soft_delete=False):
		game = Game.objects.get(id=game_id)
		if soft_delete:
			game.soft_delete()
		else:
			game.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class GameRestore(APIView):
	""" api view for restoring a single game via post """
	def post(self, request, game_id):
		game = Game.objects.get(id=game_id)
		game.restore()

		serializer = GameSerializer(game)
		return Response(serializer.data)




class TagList(APIView):
	"""api view for listing tags via get and creating new tags via post"""

	def get(self, request, deleted=False):
		if deleted:
			tags = Tag.objects.filter(is_deleted=True)
		else:
			tags = Tag.objects.filter(is_deleted=False)

		serializer = TagSerializer(tags, many=True)
		return Response(serializer.data)

	def post(self, request):
		serializer = TagSerializer(data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagDetail(APIView):
	"""api view for getting a single tag via get and updating a single tag via post"""

	def get(self, request, tag_id):
		tag = Tag.objects.get(id=tag_id)
		serializer = TagSerializer(tag)
		return Response(serializer.data)

	def post(self, request, tag_id):
		tag = Tag.objects.get(id=tag_id)
		serializer = TagSerializer(tag, data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagDelete(APIView):
	""" api view for deleting a single tag via post """
	def post(self, request, tag_id, soft_delete=False):
		tag = Tag.objects.get(id=tag_id)
		if soft_delete:
			tag.soft_delete()
		else:
			tag.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class TagRestore(APIView):
	""" api view for restoring a single tag via post """
	def post(self, request, tag_id):
		tag = Tag.objects.get(id=tag_id)
		tag.restore()
		serializer = TagSerializer(tag)
		return Response(serializer.data)

class ImageDetail(APIView):
	""" api view for adding a single image via post """
	def post(self, request, game_id):
		game = Game.objects.get(id=game_id)
		serializer = ImageSerializer(game, data=request.data)

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)