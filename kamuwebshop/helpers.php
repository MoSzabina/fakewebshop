<?php
function available_locales(): array
{
    return explode(',', config('app.available_locales', 'en'));
}
