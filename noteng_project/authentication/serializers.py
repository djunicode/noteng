from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['sapid', 'password', 'email', 'fname', 'lname', 'contact_number']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TokenObtainPairSerializer(serializers.Serializer):
    default_error_messages = {
        'no_active_account': 'No active account found with the given credentials'
    }
    sapid = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        sapid = attrs.get('sapid')
        password = attrs.get('password')

        if sapid and password:
            user = User.objects.filter(sapid__iexact=sapid).first()  # Case-insensitive filter
            if user and user.check_password(password):
                if not user.is_active:
                    raise serializers.ValidationError(self.default_error_messages['no_active_account'])
                refresh = RefreshToken.for_user(user)
                return {
                    'sapid': user.sapid,
                    'user': user,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
        raise serializers.ValidationError('Unable to login with provided credentials.')
