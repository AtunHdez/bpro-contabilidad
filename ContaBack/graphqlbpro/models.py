from django.db import models

# Create your models here.
class Fruit(models.Model):
    """A tasty treat"""
    name = models.CharField(
        max_length=20,
    )
    color = models.ForeignKey(
        "Color",
        on_delete=models.CASCADE,
        related_name="fruits",
        blank=True,
        null=True,
    )

class Color(models.Model):
    name = models.CharField(
        max_length=20,
        help_text="field description",
    )