from django.db import models

# Create your models here.

class Task(models.Model):
    item = models.CharField(max_length=200)
    done = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.title