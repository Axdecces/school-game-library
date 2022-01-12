from django.db import models

# Create your models here.

class Tag(models.Model):
	title = models.CharField(max_length=120)
	is_deleted = models.BooleanField(default=False)

	class Meta:
		ordering = ['title']

	def soft_delete(self):
		self.is_deleted = True
		self.save()

	def restore(self):
		self.is_deleted = False
		self.save()

	def __str__(self):
		return self.title
	
	def __repr__(self) -> str:
		return self.title

class Game(models.Model):
	title = models.CharField(max_length=120)
	description = models.TextField()
	tags = models.ManyToManyField(Tag, blank=True)
	rating = models.IntegerField(default=1)
	is_favorite = models.BooleanField(default=False)
	image = models.ImageField(blank=True)
	is_deleted = models.BooleanField(default=False)

	class Meta:
		ordering = ['title']

	def soft_delete(self):
		self.is_deleted = True
		self.save()

	def restore(self):
		self.is_deleted = False
		self.save()

	def __str__(self):
		return self.title
