from rest_framework import routers
from api.views import GameViewSet, TagViewSet

router = routers.SimpleRouter()
router.register(r'games', GameViewSet)
router.register(r'tags', TagViewSet)

app_name = 'api'
urlpatterns = router.urls
