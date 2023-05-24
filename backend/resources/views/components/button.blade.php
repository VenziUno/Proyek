@props(['value'])

@if ($value === 'info')
    <button class="bg-blue-400 px-4 py-2 font-bold uppercase tracking-widest rounded shadow hover:bg-blue-200" type="submit">
        {{$messages}}
    </button>
@elseif ($value === 'success')
    <button class="bg-green-400 px-4 py-2 font-bold uppercase tracking-widest rounded shadow hover:bg-green-200" type="submit">
        {{$messages}}
    </button>
@elseif ($value === 'warning')
    <button class="bg-yellow-400 px-4 py-2 font-bold uppercase tracking-widest rounded shadow  hover:bg-yellow-200" type="submit">
        {{$messages}}
    </button>
@elseif ($value === 'danger')
    <button class="bg-red-400 px-4 py-2 font-bold uppercase tracking-widest rounded shadow  hover:bg-red-200" type="submit">
        {{$messages}}
    </button>
@else
    <button>
        No option selected
    </button>
@endif
